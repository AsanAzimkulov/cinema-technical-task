import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-10-30',
  srcDir: 'src/',
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  vite: {
    plugins: [tsconfigPaths()],
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },
  css: ['~/assets/css/main.css'],
  // Fix alias resolution (no globs; use absolute paths). With srcDir set,
  // Nuxt already maps ~ and @ to src, but we keep explicit absolute aliases
  // to avoid Windows path issues.
  alias: {
    '~': resolve(process.cwd(), 'src'),
    '@': resolve(process.cwd(), 'src')
  },
  typescript: {
    strict: true,
    typeCheck: false
  },
  ssr: true
})