import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './src',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/', replacement: '/' }
    ]
  },
  server: {
    port: 1234
  },
  build: {
    outDir: '../dist',
    assetsDir: 'static'
  }
})
