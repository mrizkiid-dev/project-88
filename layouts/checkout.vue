<template>
    <ClientOnly v-if="isMobile">
        <AppbarTitle ref="appbarTitleRef" title="checkout"/>
    </ClientOnly>
    <ClientOnly v-else>   
        <AppbarSearch ref="appbarSearchRef" />
    </ClientOnly>
    <slot />
    <!-- <BottomNavTransaction v-if="isMobile" title="Total Payments" :total-payment="userTransactionStore.totalPayment" title-button="checkout" />
    <Footer v-else /> -->
    <ClientOnly v-if="!isMobile">
        <Footer />
    </ClientOnly>

</template>

<script setup>

const store = useAppStore()
const { isMobile } = useScreen()
store.isMobile = isMobile



</script>
