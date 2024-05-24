<template>
    <main v-if="!isShowError" class="w-screen flex flex-col md:flex-row justify-center items-center overflow-hidden">
        <div id="left-payment" class="h-[10vh] md:flex-1 flex flex-col justify-center items-center gap-2">
            <h1 class="font-Dela-Gothic-One tracking-widest text-2xl">PROJECT 88</h1>
            <h2 class="font-Inconsolata tracking-wider text-xl md:block hidden">- payment -</h2>
            <NuxtImg src="/img/pay.svg" width="300px" height="600px" class="mt-10 md:block hidden"/>
            <p class="font-Inconsolata tracking-wider text-base mt-10 text-center md:block hidden">Project-88 keeps <br> your information and payment safe</p>
        </div>
        <div id="snap-container" class="h-[90vh] md:w-[60vw] w-screen md:h-svh border bg-third-color"/>
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

definePageMeta({
    layout: false
})

onMounted( async() => {
    try {
        await loadScriptMidtrans({
        src: 'https://app.sandbox.midtrans.com/snap/snap.js',
        clientKey: useRuntimeConfig().midtransClientKey,
        isAsync: true,
        success: () => {
                window.snap.embed('6cd0203e-40c9-471f-afd2-8cf39458f94d', {
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
    } catch (error) {
        isShowError.value = true
    }
})

const isShowError = ref<boolean>(false)

const goBack = () => {
    navigateTo('/order')
}

</script>