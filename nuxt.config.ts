import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src/',
  modules: ['@pinia/nuxt'],
  css: ['~/assets/main.css'],
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || '',
    mongodbDatabase: process.env.MONGODB_DATABASE || 'finance_tracker',
    mongodbDnsServers: process.env.MONGODB_DNS_SERVERS || '',
  },
  typescript: {
    typeCheck: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
