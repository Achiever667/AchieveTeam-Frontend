import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'unplugin-vue-router/vite'



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      // Options (defaults to 'src/pages')
      routesFolder: 'src/pages',
      dts: 'src/typed-router.d.ts', // Generates TypeScript types for your routes
    }),
    vue(),
    tailwindcss(),
  
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
