<template>
    <main class="flex justify-center pt-[100px] min-h-svh pb-10 h-full w-full font-Inconsolata min-w-[320px] ">
        <div class="
            container mx-5 bg-third-color rounded-[25px] border-4 flex flex-col justify-center border-primary px-10  py-6
            md:w-[1082px] md:mx-0 md:rounded-[50px] 
        "   
        >
            <h1 class="text-2xl font-bold mb-5 text-center">Sign Up</h1>
            <form action="" class="flex flex-col justify-center md:flex-row md:gap-7 " @submit.prevent autocomplete="off">
                <div id="form-left" class="flex flex-col w-full gap-3 md:flex-1">
                    <TextField title="Full Name" place-holder="example name" :is-mandatory="true" v-model="form.fullname" />
                    <TextField title="Email" input-type="email" place-holder="example@email.com" :is-mandatory="true" v-model="form.email" :error="errorEmail" />
                    <TextField title="Password" :is-password="true" place-holder="••••••••••" :is-mandatory="true" v-model="form.password" :error="errorPassword" />
                    <div class="flex flex-col justify-between h-full">
                        <TextField title="WA number" input-type="tel" place-holder="081xxxxxxxxx" v-model="form.waNumber" />
                        <ButtonDarkMd :disable="isButtonDisable" v-if="!isMobile" title="SignUp" style-css="max-w-[250px] md:min-h-[50px]" @on-click="signUp"/>
                    </div>
                </div>
                <div id="form-right" class="flex flex-col w-full gap-3 md:flex-1">
                    <DropdownForm title="Province" v-model="form.province" place-holder="Jawa Barat" :choose="provinces" :loading="isProvinceLoading" @on-tap="onTapProvince"/>
                    <DropdownForm title="City" v-model="form.city" place-holder="Bandung" :choose="cities" :loading="isCityLoading"/>
                    <DropdownForm title="District" v-model="form.district" place-holder="Antapani" :choose="districts" :loading="isDistrictLoading"/>
                    <TextFieldArea title="Additional Address" :is-mandatory="false" place-holder="hi ka ...." v-model="form.address"/>
                    <ButtonDarkMd :disable="isButtonDisable" v-if="isMobile" title="SignUp" style-css="min-h-[40px] w-full" @on-click="signUp"/>
                </div>
            </form>
            <b class="mt-10"><span class="text-[#CC0202]">*</span> Mandatory</b>
        </div>
    </main>
    <teleport v-if="isSignUp.success" to="#pop-up">
        <PopSignUp image-url="/img/email-confirmation.svg" @close-pop-up="closePopUp">
            <template #title>
                <p>We have sent you email confirmation</p>
                <p>Please check your inbox</p>
            </template>
        </PopSignUp>
    </teleport>

    <teleport v-if="isSignUp.failServer" to="#pop-up">
        <PopSignUp image-url="/img/error-warning.svg" @close-pop-up="closePopUp">
            <template #title>
                <p>Oops something wrong</p>
                <p>Please try again in few minutes</p>
            </template>
        </PopSignUp>
    </teleport>

    <teleport v-if="isSignUp.failClient.value" to="#pop-up">
        <PopSignUp image-url="/img/error-warning.svg" @close-pop-up="closePopUp">
            <template #title>
                <p>{{isSignUp.failClient.errorMessage}}</p>
                <p>Please try again</p>
            </template>
        </PopSignUp>
        <Loading v-if="state.loading" />
    </teleport>

    <teleport v-if="state.loading" to="#pop-up">
        <Loading />
    </teleport>
    
</template>

<script setup lang="ts">


definePageMeta({
    layout: 'layout-auth',
    middleware: ['auth']
})

import Loading from '~/components/popup/loading.vue';
import type { ITextfieldError } from '~/types/components/textfield';
import type { ISignUpForm } from '~/types/pages/auth'
import type { IChoose, ICity, IDistrict } from  '~/types/components/dropdownForm'

onMounted(() => {
})

const { isMobile } = useScreen()
const supabaseClient = useSupabaseClient<any>()
const supabaseUser = useSupabaseUser()

const form = reactive<ISignUpForm>({
    fullname : '',
    email : '',
    password : '',
    waNumber : 0,
    province : null,
    city : null,
    district : null,
    address : '',
})

const isSignUp = reactive({
    success: false,
    failServer: false,
    failClient: {
        value: false,
        errorMessage: 'test'
    }
})

const state = reactive({
    loading: false,
    success: {
        value: false
    },
    error: {
        value: false
    },
})

const signUp = async () => {
    state.loading = true
    const { data, error } = await supabaseClient.auth.signUp({
        email: form.email,
        password: form.password,
    })

    if (error) {
        isSignUp.failClient.value = false
        state.loading = false
        console.log('error signup = ',error);
    } else {
        isSignUp.success = false
        const { data, error } = await supabaseClient.from('user').insert([
            { name: form.fullname, email: form.email, province: form.province?.name, city: form.city?.name, district: form.district?.name, additional_address: form.address, whatsapp_number: form.waNumber }
        ])
        if(error) {
            console.log('error = ',error);
        }
        if(data) {
            console.log('data insert = ',data);
            state.loading = false
            navigateTo('/')
        }
        state.loading = false
    }
  
}
//pop up
const closePopUp = () => {
    isSignUp.failClient.value = false
    isSignUp.success = false
    console.log('closePopUp');
}

//province
const isProvinceLoading = ref<boolean>(false)
const provinces = ref<IChoose[]>([])
const onTapProvince = async () => {
    if (provinces.value.length === 0) {
        isProvinceLoading.value = true
        form.city = null
        try {
            const data: IChoose[] = await $fetch('https://mrizkiid-dev.github.io/api-wilayah-indonesia/api/provinces.json',{ method: 'GET' })
            provinces.value = data
            provinces.value.sort(
                (a,b) => {
                let aName = a.name.toLowerCase()
                let bName = b.name.toLowerCase()

                if (aName < bName) {
                    return -1
                }
                if (aName > bName) {
                    return 1
                }
                return 0
                }
            )
        } catch (error) {
            console.log(error);
        } finally {
            isProvinceLoading.value = false
        }
    }
}

// City
const isCityLoading = ref<boolean>(false)
const cities = ref<ICity[]>([])
watch(() => form.province, async () => {
    form.city = null
    form.district = null
    if (form.province) {
        isCityLoading.value = true
        form.district = null
        try {
            const data: IChoose[] = await $fetch(`https://mrizkiid-dev.github.io/api-wilayah-indonesia/api/regencies/${form.province.id}.json`,{ method: 'GET' })
            cities.value = data
            cities.value.sort(
                (a,b) => {
                let aName = a.name.toLowerCase()
                let bName = b.name.toLowerCase()

                if (aName < bName) {
                    return -1
                }
                if (aName > bName) {
                    return 1
                }
                return 0
                }
            )
        } catch (error) {
            console.log(error);
        } finally {
            isCityLoading.value = false
        }
    }
})

// District
const isDistrictLoading = ref<boolean>(false)
const districts = ref<IDistrict[]>([])
watch(() => form.city, async () => {
    form.district = null
    if (form.city !== null) {
        isDistrictLoading.value = true
        try {
            const data: IChoose[] = await $fetch(`https://mrizkiid-dev.github.io/api-wilayah-indonesia/api/districts/${form.city.id}.json`,{ method: 'GET' })
            districts.value = data
            districts.value.sort(
                (a,b) => {
                let aName = a.name.toLowerCase()
                let bName = b.name.toLowerCase()

                if (aName < bName) {
                    return -1
                }
                if (aName > bName) {
                    return 1
                }
                return 0
                }
            )
        } catch (error) {
            console.log(error);
        } finally {
            isDistrictLoading.value = false
        }
    }
})


///
// ERROR
///
const errorEmail = reactive<ITextfieldError>({
    value: false,
    message: ''
})
const errorPassword = reactive<ITextfieldError>({
    value: false,
    message: ''
})

watch(() => form.email, () => {
    const isEmailValid = emailValidator(form.email)
    if(!isEmailValid && utils.isEmailEmpty()) {
        utils.setErrorEmail(true,'email should be fill')
    } else if(!isEmailValid) {
        utils.setErrorEmail(true,'email is not valid')
    } else {
        utils.setErrorEmail(false)
    }
})

watch(()=>form.password,() => {
    const isPasswordValid = passwordValidator(form.password)
    if(!isPasswordValid && utils.isPasswordEmpty()) {
        utils.setErrorPassword(true,'password should be fill')
    } else if(!isPasswordValid) {
        utils.setErrorPassword(true,'password is too weak')
    } else {
        utils.setErrorPassword(false)
    }
})

const isButtonDisable = computed<boolean>(() => {
    if (errorEmail.value || errorPassword.value) {
        return true
    }
    if (utils.isMandatoryEmpty()) {
        return true
    }
    return false
})

const utils = {
    isFullNameEmpty : () => {
        return form.fullname === '' ? true : false
    },
    isEmailEmpty : () => {
        return form.email === '' ? true : false
    },
    isPasswordEmpty : () => {
        return form.password === '' ? true : false
    },
    setErrorEmail: function(errorValue: boolean, message?: string) {
        errorEmail.value = errorValue
        errorEmail.message = message ?? ''
    },
    setErrorPassword: function(errorValue: boolean, message?: string) {
        errorPassword.value = errorValue
        errorPassword.message = message ?? ''
    },
    isMandatoryEmpty : function () {
        return ((this.isEmailEmpty() || this.isPasswordEmpty()) || this.isFullNameEmpty())
    },

}

onBeforeUnmount(() => {
    form.fullname = '',
    form.email = '',
    form.password = '',
    form.waNumber = 0,
    form.province = null,
    form.city = null,
    form.district = null,
    form.address = ''
})

</script>
