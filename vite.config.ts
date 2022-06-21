import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        add_pattern: resolve(root, 'add_pattern.html'),
        help: resolve(root, 'help.html'),
        about: resolve(root, 'about.html'),
      }
    }
  }
})