<template>
    <AppbarTitle v-if="isMobile" title="Cart"/>
    <AppbarSearch v-else/>
    <slot />
    <Footer v-if="!isMobile"/>

</template>

<script setup>

const store = useAppStore()
const { isMobile } = useScreen()
store.isMobile = isMobile



</script>
