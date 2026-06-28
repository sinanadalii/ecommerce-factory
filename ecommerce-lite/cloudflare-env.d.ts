/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    CLIENT_CONFIGS?: KVNamespace;
  }
}

export {};
