import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { homedir } from 'os'
import serveIconsPlugin from './vite-plugins/serve-icons.js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения
  const env = loadEnv(mode, process.cwd(), '')

  // Раскрываем ~/ в VITE_ICONS_PATH
  let iconsPath = env.VITE_ICONS_PATH || `${homedir()}/Documents/GitHub/application-icons`
  if (iconsPath.startsWith('~/')) {
    iconsPath = iconsPath.replace('~/', `${homedir()}/`)
  }

  return {
    base: '/ares-kudo/',
    plugins: [
      react(),
      svgr(),
      serveIconsPlugin(iconsPath)
    ],
    define: {
      'import.meta.env.VITE_ICONS_PATH': JSON.stringify(iconsPath)
    },
    resolve: {
      alias: {
        '@icons': iconsPath
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom']
          }
        }
      }
    },
    server: {
      fs: {
        // Разрешаем доступ к файлам вне корня проекта
        strict: false,
        allow: [
          // Корень проекта
          process.cwd(),
          // Директория с иконками
          iconsPath
        ]
      }
    }
  }
})
