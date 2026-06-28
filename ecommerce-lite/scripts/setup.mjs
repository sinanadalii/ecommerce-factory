#!/usr/bin/env node
/**
 * setup — the one-command onboarding flow.
 *
 *   npm run setup
 *
 * Pick a ready-made demo store OR start a blank one, and you get a working
 * store immediately. No technical knowledge required.
 *
 * Non-interactive forms (handy for scripts / CI):
 *   npm run setup -- --demo lumen
 *   npm run setup -- --blank "Acme Store"
 */
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { createStore, setActiveStore } from "./create-store.mjs";

const DEMOS = {
  "1": { key: "demo-maison-noir", label: "MAISON NOIR — Fashion" },
  "2": { key: "demo-lumen", label: "LUMEN — Tech" },
  "3": { key: "demo-terra-ash", label: "TERRA & ASH — Home / Lifestyle" },
};

// Friendly aliases accepted by `--demo`.
const DEMO_ALIASES = {
  "maison-noir": "demo-maison-noir", fashion: "demo-maison-noir", "demo-maison-noir": "demo-maison-noir",
  lumen: "demo-lumen", tech: "demo-lumen", "demo-lumen": "demo-lumen",
  "terra-ash": "demo-terra-ash", home: "demo-terra-ash", "demo-terra-ash": "demo-terra-ash",
};

function parseArgs(argv) {
  const args = argv.filter((a) => a !== "--");
  const demoIdx = args.indexOf("--demo");
  if (demoIdx !== -1) return { mode: "demo", value: args[demoIdx + 1] };
  const blankIdx = args.indexOf("--blank");
  if (blankIdx !== -1) return { mode: "blank", value: args.slice(blankIdx + 1).join(" ") };
  return { mode: null };
}

async function activateDemo(alias) {
  const key = DEMO_ALIASES[(alias || "").toLowerCase()];
  if (!key) throw new Error(`Unknown demo "${alias}". Try: fashion | tech | home`);
  await setActiveStore(key, "demo");
  done(`Demo store ready: ${key}`);
}

async function activateBlank(name) {
  const { slug } = await createStore(name);
  done(`New store ready: "${name}" (id: ${slug})`);
}

function done(msg) {
  console.log(`\n✓ ${msg}`);
  console.log(`\nStart it:`);
  console.log(`  npm run dev      → open http://localhost:3000`);
  console.log(`  open /admin      → customise everything visually\n`);
}

async function interactive() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    console.log("\n  Welcome to the Ecommerce Factory setup.\n");
    console.log("  Choose a starting point:\n");
    console.log("    1) Demo store — MAISON NOIR (Fashion)");
    console.log("    2) Demo store — LUMEN (Tech)");
    console.log("    3) Demo store — TERRA & ASH (Home / Lifestyle)");
    console.log("    4) Blank store — start from scratch\n");
    const choice = (await rl.question("  Your choice [1-4]: ")).trim();

    if (DEMOS[choice]) {
      await activateDemo(DEMOS[choice].key);
    } else if (choice === "4") {
      const name = (await rl.question("  Store name: ")).trim();
      await activateBlank(name);
    } else {
      console.log("\n  Cancelled — no changes made.\n");
    }
  } finally {
    rl.close();
  }
}

async function main() {
  const { mode, value } = parseArgs(process.argv.slice(2));
  if (mode === "demo") return activateDemo(value);
  if (mode === "blank") return activateBlank(value);
  if (!stdin.isTTY) {
    console.log('Usage: npm run setup -- --demo <fashion|tech|home>   OR   --blank "<name>"');
    return;
  }
  return interactive();
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}\n`);
  process.exit(1);
});
