<template>
        <AppbarSearchMobile v-if="isMobile" :is-gray="true" bg="bg-third-color"/>
        <AppbarSearch v-else/>
        <!-- <div :class="isMobile ? 'pt-[40px]' : 'pt-[50px]'"/> -->
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
