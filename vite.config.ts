import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'TinyDatePicker',
      fileName: 'tiny-date-picker',
      formats: ['es', 'umd']
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'tiny-date-picker.css';
          return assetInfo.name;
        }
      }
    }
  }
})