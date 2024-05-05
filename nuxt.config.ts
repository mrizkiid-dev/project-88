import { prefix } from "#tailwind-config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    rajaOngkirApi: process.env.RAJA_ONGKIR_API
  },
  components: [
    {
      path: '~/components', 
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: [
      'data',
      'types'
    ]
  },
  tailwindcss: { exposeConfig: true, },
  css: ['~/assets/css/style.css'],
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-lodash',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    'nuxt-vue3-google-signin',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],
  supabase: {
    redirect: false,
  },
  googleFonts: {
    families: {
      Inconsolata: true,
      "Dela Gothic One": true
    },
    // fontsDir: 'assets/fonts'
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID
  },
  // routeRules: {
  //   '/auth/login' : {ssr : false},
  //   '/auth/signup' : {ssr : false},
  //   '/auth/confirm' : {ssr : false},
  // }
})
