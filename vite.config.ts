import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:color' as color;\n`,
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api']
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ui': ['ant-design-vue'],
          'utils': ['axios', 'vue-i18n']
        }
      }
    }
  }
})
