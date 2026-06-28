import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ClientKey } from "./active-client";
import type { StoreOrder } from "./types";

const STORE_FILE = ".data/orders.json";
const KV_PREFIX = "orders";

type OrderKV = Pick<KVNamespace, "get" | "put">;
type OrdersByClient = Partial<Record<ClientKey, StoreOrder[]>>;

async function getKvBinding(): Promise<OrderKV | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as CloudflareEnv & { CLIENT_CONFIGS?: OrderKV }).CLIENT_CONFIGS;
    if (!kv) throw new Error("Missing Cloudflare KV binding CLIENT_CONFIGS.");
    return kv;
  } catch (error) {
    if (error instanceof Error && error.message.includes("CLIENT_CONFIGS")) throw error;
    return null;
  }
}

async function readFileOrders(): Promise<OrdersByClient> {
  const [{ promises: fs }, path] = await Promise.all([import("node:fs"), import("node:path")]);
  try {
    const raw = await fs.readFile(path.join(process.cwd(), STORE_FILE), "utf8");
    return JSON.parse(raw) as OrdersByClient;
  } catch {
    return {};
  }
}

async function writeFileOrders(orders: OrdersByClient): Promise<void> {
  const [{ promises: fs }, path] = await Promise.all([import("node:fs"), import("node:path")]);
  const target = path.join(process.cwd(), STORE_FILE);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, JSON.stringify(orders, null, 2), "utf8");
}

async function readOrdersForClient(key: ClientKey): Promise<StoreOrder[]> {
  const kv = await getKvBinding();
  if (!kv) {
    const orders = await readFileOrders();
    return orders[key] ?? [];
  }

  const raw = await kv.get(`${KV_PREFIX}:${key}`);
  return raw ? (JSON.parse(raw) as StoreOrder[]) : [];
}

async function writeOrdersForClient(key: ClientKey, orders: StoreOrder[]): Promise<void> {
  const kv = await getKvBinding();
  if (!kv) {
    const all = await readFileOrders();
    await writeFileOrders({ ...all, [key]: orders });
    return;
  }

  await kv.put(`${KV_PREFIX}:${key}`, JSON.stringify(orders));
}

export async function createOrder(key: ClientKey, order: StoreOrder): Promise<void> {
  const orders = await readOrdersForClient(key);
  await writeOrdersForClient(key, [order, ...orders]);
}

export async function getOrdersForClient(key: ClientKey): Promise<StoreOrder[]> {
  return readOrdersForClient(key);
}

export async function getAllOrders(keys: ClientKey[]): Promise<StoreOrder[]> {
  const groups = await Promise.all(keys.map((key) => readOrdersForClient(key)));
  return groups.flat().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}
