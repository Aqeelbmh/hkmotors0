import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Force-enable nitro to ensure the Vercel deployment plugin is active
  nitro: true,
  tanstackStart: {
    server: { entry: "server" },
  },
});
