import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    force: true, // إجبار السيرفر على استخدام HTTP/1.1 عند الحاجة
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false, // إذا كان هناك مشكلة مع SSL
        ws: true, // لتفعيل WebSockets
      },
    },
  },
})
