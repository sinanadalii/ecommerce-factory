"use server";

import { redirect } from "next/navigation";
import { getActiveClient, getActiveClientKey } from "@/config/tenant";
import { createOrder } from "@/config/order-store";
import type { Product, StoreOrder } from "@/config/types";

function allProducts(config: Awaited<ReturnType<typeof getActiveClient>>): Product[] {
  return [
    config.content.hero.product,
    ...config.content.featured.products,
    ...config.content.flashSale.products,
    ...config.content.bestSellers.products,
  ].filter((product) => !product.hidden);
}

function field(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}

export async function placeOrder(formData: FormData): Promise<void> {
  const [clientId, config] = await Promise.all([getActiveClientKey(), getActiveClient()]);
  const productSlug = field(formData, "productSlug");
  const product = allProducts(config).find((p) => p.slug === productSlug);

  if (!product) throw new Error("Selected product is no longer available.");

  const id = `ord-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`;
  const order: StoreOrder = {
    id,
    clientId,
    clientName: config.brand.name,
    status: "new",
    createdAt: new Date().toISOString(),
    customer: {
      name: field(formData, "name"),
      email: field(formData, "email"),
      phone: field(formData, "phone"),
      address: field(formData, "address"),
    },
    items: [
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        quantity: 1,
        unitPrice: product.price,
      },
    ],
    subtotal: product.price,
    notes: field(formData, "notes"),
  };

  await createOrder(clientId, order);
  redirect(`/checkout/thank-you?order=${encodeURIComponent(id)}`);
}
