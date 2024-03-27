<template>
    <main class="flex justify-center pt-[100px] min-h-svh pb-10 h-full w-full font-Inconsolata">
        <div class="
            container mx-5 bg-third-color rounded-[25px] border-4 border-primary flex justify-center min-w-[320px]
            md:w-[1082px] md:mx-0 md:rounded-[50px]
        ">
            <div class="
                    container max-w-[500px] flex flex-col gap-2 justify-center px-5
                    md:px-0
                    ">
                <h1 class="text-2xl font-bold mb-5 text-center">Sign in to Project88</h1>
                <div class="cursor-pointer border flex flex-row gap-2 py-3 px-6 min-h-[60px] justify-center items-center rounded-full" 
                        @click="loginProvider('google')">
                        <Icon name="flat-color-icons:google" size="24" class=""/>
                        <h3>Sign in with google</h3>
                </div>
                <div class="flex justify-center items-center gap-3 text-[#757575]">
                    <hr class="w-full"></hr>
                    <h2 class="text-[16px] text-nowrap">or sign in with email</h2>
                    <hr class="w-full"></hr>
                </div>
                <form action="" @submit.prevent class="flex flex-col gap-4" autocomplete="new-password">
                    <TextField title="Email" :is-error="isErrorMessage" :is-mandatory="true" place-holder="example@email.com" v-model="email" />
                    <TextField title="Password" :is-error="isErrorMessage" :is-mandatory="true" place-holder="••••••••••" :is-password="true" v-model="password" />
                    <ButtonDarkMd style-css="mt-10" title="Login" @on-click="loginPassword"/>
                    <div class="flex justify-center text-base gap-2 md:text-lg">
                        <span class="">Don't have an account ? </span>
                        <NuxtLink to="/auth/signup">
                            <span class="underline font-bold cursor-pointer">Sign Up</span>
                        </NuxtLink>
                    </div>
                </form>
                <div v-if="errorMessage" class="w-full bg-gray-darker text-error-red py-2 text-center rounded-[5px]">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'layout-auth',
    middleware: ['auth']
})

import type { Provider } from '~/node_modules/@supabase/gotrue-js/src/lib/types'

const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()

// AUTH
const loginProvider = async(prov: Provider) => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({ provider: prov })
}
const loginPassword = async() => {
    const { error } = await supabaseClient.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
}

const signUp = async (email: string, password: string) => {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  })
}

const signOut = async ()=> {
    const { error } = await supabaseClient.auth.signOut()
}


// input
const email = ref<string>('')
const password = ref<string>('')

const errorMessage = ref<string>('')
const isErrorMessage = computed<boolean>(() => {
    return errorMessage.value ? true : false
})

</script>