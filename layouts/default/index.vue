<template>
        <!-- <ClientOnly> -->
                <AppbarSearchMobile v-if="isMobile" :is-gray="false" bg="bg-secondary" v-model="searchAppBar"/>
                <AppbarSearch v-else v-model="searchAppBar"/>
        <!-- </ClientOnly> -->
        <div :class="isMobile ? 'pt-[60px]' : 'pt-[70px]'"/>
        <slot >

        </slot>
        <b>{{ searchAppBar }}</b>
        <!-- <ClientOnly>  -->
                <Bottomnav v-if="isMobile"/>
                <Footer v-else />
        <!-- </ClientOnly> -->
</template>

<script setup lang="ts">

const { isMobile, width } = useScreen()
const store = useAppStore()
store.isMobile = isMobile.value
const searchAppBar = defineModel<string>()

watch(searchAppBar, () => {
    console.log('aaa = ',searchAppBar.value);
})

</script>
