import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        imagemin({
          gifsicle: { optimizationLevel: 3 },
          optipng: { optimizationLevel: 7 },
          mozjpeg: { quality: 80, progressive: true },
          pngquant: { quality: [0.6, 0.8] },
          webp: { quality: 75 }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom'],
              'vendor-icons': ['lucide-react'],
            }
          }
        }
      }
    };
});
