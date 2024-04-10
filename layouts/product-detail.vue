<template>
        <AppbarTitle v-if="isMobile" title="Project88" :is-logo="true"/>
        <AppbarSearch v-else/>
        <slot>

        </slot>
                <Bottomnav v-if="isMobile"/>
                <Footer v-else />

        <!-- <BottomNavTransaction title="Total Payments" total-price="976.000" title-button="checkout" /> -->
</template>

<script setup>

const store = useAppStore()
const { isMobile, width } = useScreen()
store.isMobile = isMobile

</script>
