import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode })=>{
  const isDev = mode === 'development'

  return{
    plugins: [react(),tsconfigPaths()],
    server: {
      proxy: {
        "/api": {
          target: isDev ? "http://localhost:3000": "https://main.d2xaef8h7k95lm.amplifyapp.com",
          changeOrigin: isDev,
          secure: !isDev
        }
      },
      
    },
    build: {
      outDir: "dist/vite",
      assetsDir: "assets",
      sourcemap: true,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
          },
        },
      },
    },
  }

})
