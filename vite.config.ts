import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Configuration JSX optimisée pour Vercel
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      //
    },
  },
  optimizeDeps: {
    // Forcer la pré-bundling de React pour éviter les problèmes CJS
    include: ['react', 'react-dom'],
    esbuildOptions: {
      // Résoudre les modules CommonJS
      target: 'es2020',
    }
  },
  build: {
    // Configuration optimisée pour Vercel
    minify: 'esbuild',
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      },
      external: (id) => {
        // Éviter l'externalisation de JSX runtime
        if (id.includes('react/jsx-runtime') || id.includes('react-jsx-runtime')) {
          return false;
        }
        return false;
      },
    }
  },
  // Configuration spécifique pour les environnements de build
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})
