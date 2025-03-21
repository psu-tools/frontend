import inject from '@rollup/plugin-inject'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    inject({
      include: ['**/*.js', '**/*.ts'], // Исключаем .vue файлы
    }),
  ],
})
