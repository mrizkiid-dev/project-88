<template>
        <AppbarTitle v-show="isMobile" title="Project88" :is-logo="true"/>
        <AppbarSearch v-show="!isMobile"/>
        <slot />
        <Bottomnav v-show="isMobile"/>
        <Footer v-show="!isMobile" />

        <!-- <BottomNavTransaction title="Total Payments" total-price="976.000" title-button="checkout" /> -->
</template>

<script setup>

const store = useAppStore()
const { isMobile, width } = useScreen()
store.isMobile = isMobile

</script>
