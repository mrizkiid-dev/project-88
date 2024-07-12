// plugins/supabase.ts
import { defineNuxtPlugin } from '#app'
import useSupabaseClient from '@nuxtjs/supabase'

export default defineNuxtPlugin(() => {
  const client = useSupabaseClient

  return {
    provide: {
      supabaseClient: client
    }
  }
})
