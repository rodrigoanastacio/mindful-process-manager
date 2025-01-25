import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers:
      mode === "development"
        ? {}
        : {
            "Content-Security-Policy":
              "default-src 'self' https://*.supabase.co; script-src 'self' https://*.supabase.co; style-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co; img-src 'self' data: https://*.supabase.co; frame-src 'self' https://*.supabase.co;",
          },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
