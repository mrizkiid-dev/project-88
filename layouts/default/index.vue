<template>
    <ClientOnly>
            <AppbarSearchMobile v-if="isMobile" :is-gray="true" bg="bg-third-color"/>
            <AppbarSearch v-else/>
    </ClientOnly>
    <!-- <div :class="isMobile ? 'pt-[40px]' : 'pt-[50px]'"/> -->
    <slot>

    </slot>
    <ClientOnly> 
            <Bottomnav v-if="isMobile"/>
            <Footer v-else />
    </ClientOnly>
</template>

<script setup>

const store = useAppStore()
const { isMobile, width } = useScreen()
store.isMobile = isMobile

</script>
