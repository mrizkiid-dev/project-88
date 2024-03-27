<template>
    <main class="flex justify-center pt-[100px] min-h-svh pb-10 h-full w-full font-Inconsolata ">
        <div class="
            container mx-5 bg-third-color rounded-[25px] border-4 flex flex-col justify-center border-primary min-w-[320px] px-10  py-6
            md:w-[1082px] md:mx-0 md:rounded-[50px] 
        "   
        >
            <h1 class="text-2xl font-bold mb-5 text-center">Sign Up</h1>
            <form action="" class="flex flex-col justify-center md:flex-row md:gap-7 " @submit.prevent autocomplete="off">
                <div id="form-left" class="flex flex-col w-full gap-3 md:flex-1">
                    <TextField title="Full Name" place-holder="example name" :is-mandatory="true" v-model="fullname" />
                    <TextField title="Email" place-holder="example@email.com" :is-mandatory="true" v-model="email" />
                    <TextField title="Password" :is-password="true" place-holder="••••••••••" :is-mandatory="true" v-model="password" />
                    <div class="flex flex-col justify-between h-full">
                        <TextField title="WA number" place-holder="081xxxxxxxxx" v-model="waNumber" />
                        <ButtonDarkMd v-if="!isMobile" title="SignUp" style-css="max-w-[250px] md:min-h-[50px]" @on-click=""/>
                    </div>
                </div>
                <div id="form-right" class="flex flex-col w-full gap-3 md:flex-1">
                    <TextField title="Province" place-holder="Jawa Barat" v-model="province" />
                    <TextField title="City" place-holder="Bandung" v-model="city" />
                    <TextField title="District" place-holder="Antapani" v-model="district" />
                    <TextFieldArea title="Additional Address" :is-mandatory="false" place-holder="hi ka ...." :model-value="address"/>
                    <ButtonDarkMd v-if="isMobile" title="SignUp" style-css="min-h-[40px] w-full" @on-click=""/>
                </div>
            </form>
            <b class="mt-10"><span class="text-[#CC0202]">*</span> Mandatory</b>
        </div>
    </main>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'layout-auth',
    middleware: ['auth']
})

onMounted(() => {
    fullname.value = ''
    email.value = ''
    password.value = ''
    waNumber.value = ''
    province.value = ''
    city.value = ''
    district.value = ''
    address.value = ''
})

const { isMobile } = useScreen()

const fullname = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const waNumber = ref<string>('')
const province = ref<string>('')
const city = ref<string>('')
const district = ref<string>('')
const address = ref<string>('')

onBeforeUnmount(() => {
    fullname.value = ''
    email.value = ''
    password.value = ''
    waNumber.value = ''
    province.value = ''
    city.value = ''
    district.value = ''
    address.value = ''
})

</script>
