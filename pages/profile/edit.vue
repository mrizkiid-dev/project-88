<template>
    <main class="py-[90px] px-[10px] md:py-[80px] min-h-[47svh] flex flex-col items-center justify-center h-full w-full font-Inconsolata min-w-[320px] ">
        <h1 class="text-xl font-bold mb-5 text-center bg-primary text-third-color px-3 py-2 md:text-2xl">Edit Profile</h1>
        <div class="
            container mx-5 bg-third-color rounded-[25px] border-2 flex flex-col justify-center border-primary px-10 py-6
            md:w-[1082px] md:mx-0 md:rounded-[50px] md:border-4
        "   
        >
            <form action="" class="flex flex-col justify-center md:flex-row md:gap-7 " @submit.prevent autocomplete="off">
                <div id="form-left" class="flex flex-col w-full gap-3 md:flex-1">
                    <TextField title="Full Name" place-holder="example name" :is-mandatory="true" v-model="form.fullname" />
                    <TextField title="Email" input-type="email" place-holder="example@email.com" :is-mandatory="true" v-model="form.email" :error="errorEmail" />
                    <div class="flex flex-col justify-between h-full">
                        <TextField title="WA number" input-type="tel" place-holder="81xxxxxxxxx" v-model="form.waNumber" />
                        <ButtonDarkMd :disable="isButtonDisable" v-if="!isMobile" title="save" style-css="max-w-[250px] md:min-h-[50px] mt-[10px]" @on-click="signUp"/>
                    </div>
                </div>
                <div id="form-right" class="flex flex-col w-full gap-3 md:flex-1">
                    <DropdownForm title="Province" v-model="form.province" place-holder="Jawa Barat"
                        :is-show-drop-down="isShowDropDown.province" :choose="provinces" :loading="isProvinceLoading" @on-tap="onTapProvince" @on-tap-drop-down="onTapDropDownProvince"/>
                    <DropdownForm title="City" v-model="form.city" place-holder="Bandung" empty-warning="province should not be empty"
                        :is-show-drop-down="isShowDropDown.city" :choose="cities" :loading="isCityLoading" @on-tap="onTapCity" @on-tap-drop-down="onTapDropDownCity"/>
                    <!-- <DropdownForm title="District" v-model="form.district" place-holder="Antapani" empty-warning="city should not be empty"
                        :is-show-drop-down="isShowDropDown.district" :choose="districts" :loading="isDistrictLoading" @on-tap="onTapDistrict" @on-tap-drop-down="onTapDropDownDistrict"/> -->
                    <TextFieldArea title="Additional Address" :is-mandatory="false" place-holder="hi ka ...." v-model="form.address"/>
                    <ButtonDarkMd :disable="isButtonDisable" v-if="isMobile" title="save" style-css="min-h-[40px] w-full" @on-click="signUp"/>
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
        <!-- <Loading v-if="state.loading" /> -->
    </teleport>

    <teleport v-if="state.loading" to="#pop-up">
        <Loading />
    </teleport>
    
</template>

<script setup lang="ts">
// definePageMeta({
//     layout: 'layout-auth',
// })

import Loading from '~/components/popup/loading.vue';
import type { ITextfieldError } from '~/types/components/textfield';
import type { ISignUpForm } from '~/types/pages/auth'
import type { IChoose, ICity, IDistrict } from  '~/types/components/dropdownForm'
import type { responseProvince, responseCities } from '~/types/response/responseShipping'
import type { TDatabase, IDatabase } from '~/types/database/supabase'
import type { TUser } from '~/types/database/user'
import { onBeforeUnmount } from 'vue';

onMounted(async() => {
    try {
        const { data, error } = await supabaseClient.from('user').select('name,email,user_address(whatsapp_number, province_id, province, city_id, city, district, additional_address)').eq('uuid', profileStore.uuid)
        if (error) {
            throw JSON.stringify(error)
        }

        if (data && data.length > 0) {
            form.fullname = data[0].name
            form.email = data[0].email
            form.waNumber = data[0].user_address[0].whatsapp_number
            form.province = {
                id: data[0].user_address[0].province_id,
                name: data[0].user_address[0].province
            }
            form.city = {
                id: data[0].user_address[0].city_id,
                name: data[0].user_address[0].city
            }
            form.address = data[0].user_address[0].additional_address
        }
        
        isFirstTime = true

    } catch (error) {
        console.log('error profile edit = ',error);
    }
})

onBeforeMount(() => {

})

const { isMobile } = useScreen()
const supabaseClient = useSupabaseClient<any>()
const supabaseUser = useSupabaseUser()
const profileStore = useProfileStore()

type TUpdateUser = {
    fullname    : string
    email       : string
    waNumber    : number
    province    : IChoose | null
    city        : ICity | null
    district    : IDistrict | null
    address     : string
}

let isFirstTime: boolean = false

const form = reactive<TUpdateUser>({
    fullname : '',
    email : '',
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
    if ( provinces.value.length === 0 ) {
        isProvinceLoading.value = true
        try {
            // const data: IChoose[] = await $fetch('https://mrizkiid-dev.github.io/api-wilayah-indonesia/api/provinces.json',{ method: 'GET' })
            const response: responseProvince =  await $fetch('/api/shipping/province',{
                onResponseError({request, response, options}) {
                    if (response.status === 400) {
                        throw response._data
                    }
                    if (response.status === 500) {
                        throw response._data
                    }
                },
                server: false
            })
            response.data.forEach(province => {
                provinces.value.push({
                    id: province.province_id,
                    name: province.province
                })
            });  
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
    dropDownProvince()
}

// City
const isCityLoading = ref<boolean>(false)
const cities = ref<ICity[]>([])
watch(() => form.province, async () => {
    if ( !isFirstTime ) {
        form.city = null
    }

    if (form.province) {
        isCityLoading.value = true
        form.district = null
        try {
            // const data: IChoose[] = await $fetch(`https://mrizkiid-dev.github.io/api-wilayah-indonesia/api/regencies/${form.province.id}.json`,{ method: 'GET' })
            const response: responseCities =  await $fetch('/api/shipping/city',{
                query: {
                    province: form.province.id
                },
                onResponseError({request, response, options}) {
                    if (response.status === 400) {
                        throw response._data
                    }
                    if (response.status === 500) {
                        throw response._data
                    }
                },
                server: false
            })
            response.data.forEach(city => {
                cities.value.push({
                    id: city.city_id,
                    name: city.type + ' ' + city.city_name,
                    postal_code: city.postal_code
                })
            });  
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
            isFirstTime = false
        }
    }
})

//DropDown Logic
const isShowDropDown = reactive({
    province: false,
    city: false,
    district: false
})

const onTapDropDownProvince = () => {
    isShowDropDown.province = false
}
const onTapDropDownCity = () => {
    isShowDropDown.city = false
}
const onTapDropDownDistrict = () => {
    isShowDropDown.district = false
}

const dropDownProvince = () => {
    isShowDropDown.province = !isShowDropDown.province
    isShowDropDown.city = false
    isShowDropDown.district = false
}

const onTapCity = () => {
    isShowDropDown.province = false
    isShowDropDown.city = !isShowDropDown.city
    isShowDropDown.district = false
}

const onTapDistrict = () => {
    isShowDropDown.province = false
    isShowDropDown.city = false
    isShowDropDown.district = !isShowDropDown.district
}


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
    setErrorEmail: function(errorValue: boolean, message?: string) {
        errorEmail.value = errorValue
        errorEmail.message = message ?? ''
    },
    setErrorPassword: function(errorValue: boolean, message?: string) {
        errorPassword.value = errorValue
        errorPassword.message = message ?? ''
    },
    isMandatoryEmpty : function () {
        return (this.isEmailEmpty() || this.isFullNameEmpty())
    },

}

onBeforeUnmount(() => {
    form.fullname = '',
    form.email = '',
    form.waNumber = 0,
    form.province = null,
    form.city = null,
    form.district = null,
    form.address = ''
})

</script>
