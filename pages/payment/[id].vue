<template>
    <main v-if="!isShowError" class="w-screen flex flex-col md:flex-row justify-center items-center overflow-hidden">
        <div id="left-payment" class="h-[10vh] md:flex-1 flex flex-col justify-center items-center gap-2">
            <h1 class="font-Dela-Gothic-One tracking-widest text-2xl">PROJECT 88</h1>
            <h2 class="font-Inconsolata tracking-wider text-xl md:block hidden">- payment -</h2>
            <NuxtImg src="/img/pay.svg" width="300px" height="600px" class="mt-10 md:block hidden"/>
            <p class="font-Inconsolata tracking-wider text-base mt-10 text-center md:block hidden">Project-88 keeps <br> your information and payment safe</p>
        </div>
        <div v-if="isTokenExist" id="snap-container" class="h-[90vh] md:w-[60vw] w-screen md:h-svh border bg-third-color"/>
        <div v-else class="h-[90vh] md:w-[60vw] w-screen md:h-svh border bg-third-color flex flex-col items-center justify-center gap-2">
            <h3 class="text-xl md:text-3xl">Please Contact us via whatsapp for payment process</h3>
            <h4 class="text-lg md:text-2xl">Click Button Below</h4>
            <ButtonBgYellow title="contact us" sytle-css="mt-7 min-w-[200px] min-h-[50px] text-xl md:text-2xl tracking-widest"/>
        </div>
    </main>
    
    <!-- <main v-if="isShow.success" id="success-section" class="h-screen w-screen flex flex-col justify-center items-center gap-10">
        <NuxtImg src="/img/order-confirmed.svg" :width="isMobile ? '200px' : '400px'" height="isMobile ? '400px' : '700px'" class=""/>
        <h3 class="font-Inconsolata tracking-[0.2em] text-xl md:text-4xl font-semibold">ORDER CONFIRMED</h3>
        <ButtonDarkMd title="Go Back" style-css="inline-block max-w-[200px] md:max-w-[300px] tracking-widest" @on-click="goBack"/>
    </main> -->

    <main v-if="isShowError" id="error-section" class="h-screen w-screen flex flex-col justify-center items-center gap-10">
        <NuxtImg src="/img/error-warning.svg" :width="isMobile ? '150px' : '250px'" height="isMobile ? '200px' : '400px'" class=""/>
        <h3 class="font-Inconsolata tracking-[0.2em] text-xl md:text-4xl font-semibold">PAYMENT ERROR</h3>
        <ButtonDarkMd title="Go Back" style-css="inline-block max-w-[200px] md:max-w-[300px] tracking-widest" @on-click="goBack"/>
    </main>
</template>

<script setup lang="ts">
const { isMobile } = useScreen()
const route = useRoute()

definePageMeta({
    layout: false
})


// const response = await $fetch('/api/shipping/midtrans-token',{
//           method: 'POST',
//           body: <TSnapCreateTransaction>{
//             id: midtransId,
//             product: itemDetails,
//             customer_detail: customer_detail,
//             gross_amount: checkoutStore.totalPayment
//           }
//         })

//         if (response && typeof response === 'object' && 'token' in response && typeof response.token === 'string'){
//           const { error } = await supabaseClient.from('order').update({
//             midtrans_id: midtransId,
//             midtrans_token: response.token,
//           }).eq('id', data[0].id)

//           if ( !error ) {
//             navigateTo(`/payment/${data[0].id}`)
//           } else {
//             hasError.payment = true
//             throw JSON.stringify(error)
//           }
//         }

onMounted( async() => {
    try {
        if(!(route.params.id && typeof route.params.id === 'string' && isANumber(route.params.id))) {
            throw 'route should be number and the input is only one id'
        }
        const { data, error } = await useSupabaseClient().from('order').select('midtrans_token').eq('id', route.params.id)
        if ( data && data.length > 0 && data[0].midtrans_token){
            isTokenExist.value = true
            await loadScriptMidtrans({
                src: 'https://app.sandbox.midtrans.com/snap/snap.js',
                clientKey: useRuntimeConfig().midtransClientKey,
                isAsync: true,
                success: () => {
                        window.snap.embed(data[0].midtrans_token, {
                            embedId: 'snap-container',
                            onSuccess() {
                                goBack()
                            },
                            onError() {
                                isShowError.value = true
                            },
                            onClose() {
                                goBack()
                            },
                        });
                    }
                })
        } 
        
        if (error) {
            isTokenExist.value = false
            throw JSON.stringify(error)
        }
    } catch (error) {
        isShowError.value = true
    }
})

const isShowError = ref<boolean>(false)
const isTokenExist = ref<boolean>(false)

const goBack = () => {
    navigateTo('/order')
}

</script>