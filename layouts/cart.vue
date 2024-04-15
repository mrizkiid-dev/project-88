<template>
    <AppbarTitle v-if="isMobile" title="Cart"/>
    <AppbarSearch v-else/>
    <slot>

    </slot>
    <!-- <BottomNavTransaction v-if="isMobile" title="Total Payments" :total-payment="userTransactionStore.totalPayment" title-button="checkout" />
    <Footer v-else /> -->
    <Footer v-if="!isMobile"/>

</template>

<script setup>

const store = useAppStore()
const { isMobile } = useScreen()
store.isMobile = isMobile

const userTransactionStore = useUserTransactionStore()


</script>
