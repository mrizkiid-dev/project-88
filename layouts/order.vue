<template>
    <AppbarTitle v-if="isMobile" title="Orders"/>
    <AppbarSearch v-else/>
    <slot>

    </slot>
    <Bottomnav v-if="isMobile"/>
    <Footer v-else />
</template>

<script setup>

const store = useAppStore()
const { isMobile, width } = useScreen()
store.isMobile = isMobile

</script>
