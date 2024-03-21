<template>
    <ClientOnly>
            <AppbarSearchMobile v-if="isMobile" :is-gray="false"/>
            <AppbarSearch v-else/>
    </ClientOnly>
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
