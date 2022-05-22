import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@c": resolve(__dirname, "src/components"),
    },
    extensions: ['.js', '.json', '.ts']
  },
  plugins: [vue()],
  // 自动开启浏览器
  // server: {
  //   open: true,
  // }
})
