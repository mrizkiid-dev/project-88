import { prefix } from "#tailwind-config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  hooks: {
    "components:dirs": (dirs) => {
      dirs.push(
        {path: '~/components/appbar',},
        {path: '~/components/bottomnav',},
      )
    }
  },
  tailwindcss: { exposeConfig: true, },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-lodash',
    'nuxt-icon',
    '@nuxtjs/google-fonts'
  ],
  supabase: {
    // url: process.env.SUPABASE_URL,
    // key: process.env.SUPABASE_KEY,
    redirect: false
    // redirectOptions: {
    //   login: '/login',
    //   callback: '/confirm'
    // }
  },
  googleFonts: {
    families: {
      Inconsolata: true,
      "Dela Gothic One": true
    },
    // fontsDir: 'assets/fonts'
  }
})
