import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './src',
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: [
      { find: '@/', replacement: '/' }
    ]
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: true,
    port: 1234
  },
  build: {
    outDir: '../dist',
    assetsDir: 'static'
  }
})
