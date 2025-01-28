import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ui": path.resolve(__dirname, "src/components/ui"),
      "@layout": path.resolve(__dirname, "src/components/layout"),
    },
  },
})
