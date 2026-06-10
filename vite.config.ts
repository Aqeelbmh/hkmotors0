import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // This tells Nitro to build specifically for Vercel's Serverless functions
    server: { entry: "server" },
  },
});
