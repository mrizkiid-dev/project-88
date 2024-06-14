<template>
        <AppbarSearchMobile v-show="isMobile" :is-gray="true" bg="bg-third-color"/>
        <AppbarSearch v-show="!isMobile"/>
        <!-- <div :class="isMobile ? 'pt-[40px]' : 'pt-[50px]'"/> -->
        <slot>

        </slot>
        <Bottomnav v-show="isMobile"/>
        <Footer v-show="!isMobile" />
</template>

<script setup>

const store = useAppStore()
const { isMobile, width } = useScreen()
store.isMobile = isMobile



</script>
