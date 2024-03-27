<template>
    <ClientOnly>
            <AppbarSearchMobile v-if="isMobile" :is-gray="true"/>
            <AppbarSearch v-else/>
    </ClientOnly>
    <div :class="isMobile ? 'pt-[60px]' : 'pt-[70px]'"/>
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
