<template>
    <teleport v-if="profileStore.isLoading" to="#pop-up">
        <Loading />
    </teleport>
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
                    <TextField title="Email" input-type="text" :error="errorEmail" :is-mandatory="true" place-holder="example@email.com" v-model="form.email" />
                    <TextField title="Password" :error="errorPassword" :is-mandatory="true" place-holder="••••••••••" :is-password="true" v-model="form.password" />
                    <ButtonDarkMd :disable="isButtonDisable" style-css="mt-10" title="Login" @on-click="loginPassword"/>
                    <div class="flex justify-center text-base gap-2 md:text-lg">
                        <span class="">Don't have an account ? </span>
                        <NuxtLink to="/auth/signup">
                            <span class="underline font-bold cursor-pointer">Sign Up</span>
                        </NuxtLink>
                    </div>
                </form>
                <div v-if="errorLogin.value" class="w-full bg-gray-darker text-error-red py-2 text-center rounded-[5px]">
                    Invalid Email and Password
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'layout-auth',
    // middleware: ['auth']
})

import type { Provider } from '@supabase/auth-js/src/lib/types'
import type { ISignInForm } from '~/types/pages/auth';
import type { ITextfieldError } from '~/types/components/textfield';
import type { IDatabase } from '~/types/database/supabase';

const profileStore = useProfileStore()
const supabaseClient = useSupabaseClient<any>()
const user = useSupabaseUser()

console.log(user);

onMounted(() => {
    profileStore.isLoading = false
})

// AUTH
const loginProvider = async(prov: Provider) => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({ provider: prov })
    if (error) {
        console.log('error = ',error);
        
    }
    
}
const loginPassword = async() => {
    const { error } = await supabaseClient.auth.signInWithPassword({
        email: form.email,
        password: form.password,
    },)

    if (error) {
        // errorEmail.value = true
        // errorPassword.value = true
        errorLogin.value = true
        errorLogin.message = error.message
    } else {
        profileStore.isLoading = true
        await profileStore.initProfile()
        profileStore.isLoading = false
        navigateTo('/')
    }

    isButtonDisable.value = true
}

const signOut = async ()=> {
    const { error } = await supabaseClient.auth.signOut()
}


// input
const form = reactive<ISignInForm>({
    email: '',
    password: ''
})

//error
const errorLogin = reactive<ITextfieldError>({
    value: false,
    message: ''
})
const errorEmail = reactive<ITextfieldError>({
    value: false,
    message: ''
})
const errorPassword = reactive<ITextfieldError>({
    value: false,
    message: ''
})
const isButtonDisable = ref<boolean>(true)

watch([()=>form.email],() => {
    const isEmailValid = emailValidator(form.email)
    if(!isEmailValid && utils.isEmailEmpty()) {
        utils.setErrorEmail(true,'email should be fill')
    } else if(!isEmailValid) {
        utils.setErrorEmail(true,'email is not valid')
    } else {
        utils.setErrorEmail(false)
    }
})

watch([()=>form.password],() => {
    const isPasswordValid = passwordValidator(form.password)
    if(!isPasswordValid && utils.isPasswordEmpty()) {
        utils.setErrorPassword(true,'password should be fill')
    } else if(!isPasswordValid) {
        utils.setErrorPassword(true,'password is too weak')
    } else {
        utils.setErrorPassword(false)
    }
})

watch([() => form.email, () => form.password],() => {
    const isEmailValid = emailValidator(form.email)
    const isPasswordValid = passwordValidator(form.password)
    if ( isEmailValid && isPasswordValid ) {
        if( utils.isEMailOrPasswordEmpty() ) {
            utils.setButtonDisable(true, 'Email and Password Should be fill')
        } else {
            utils.setButtonDisable(false)
        }
    } else {
        utils.setButtonDisable(true)
    }
})


const utils = {
    isEmailEmpty : () => {
        return form.email === '' ? true : false
    },
    isPasswordEmpty : () => {
        return form.password === '' ? true : false
    },
    isEMailOrPasswordEmpty : function() {
        return (this.isEmailEmpty() || this.isPasswordEmpty()) ? true : false
    },
    setErrorEmail: function(errorValue: boolean, message?: string) {
        errorEmail.value = errorValue
        errorEmail.message = message ?? ''
        // isButtonDisable.value = errorEmail.value
    },
    setErrorPassword: function(errorValue: boolean, message?: string) {
        errorPassword.value = errorValue
        errorPassword.message = message ?? ''
        // isButtonDisable.value = errorEmail.value
    },
    setButtonDisable: function(isDisable: boolean, errorMessage?: string) {
        if (isDisable) {
            errorLogin.value = isDisable
            errorLogin.message = errorMessage ?? ''
            isButtonDisable.value = errorLogin.value
        } else {
            errorLogin.value = false
            errorLogin.message = ''
            isButtonDisable.value = errorLogin.value
        }
    }
}

</script>