<template>
        <AppbarSearchMobile v-show="isMobile" :is-gray="isGray" bg="bg-secondary" :in-style="inStyle"/>
        <AppbarSearch v-show="!isMobile" />
        <slot />

        <Bottomnav v-show="isMobile"/>
        <Footer v-show="!isMobile" />
</template>

<script setup lang="ts">
import type { TSearchResult } from '~/types/components/searchResult'
import { onDebounce } from '~/utils/helper';

// LifeCycle
onBeforeMount (() => {
        window.addEventListener('scroll', handleScrolll)
},)

onBeforeUnmount (() => {
        window.removeEventListener('scroll', handleScrolll)
},)

//top variable
const store = useAppStore()
const supabaseClient = useSupabaseClient()

// set screen
const { isMobile } = useScreen()
store.isMobile = isMobile.value

// app bar color
const isGray = ref<boolean>()
const inStyle = ref<string>()
const scrollY = ref<number>(0)

const handleScrolll = () => {
        console.log(window.scrollY);
        scrollY.value = window.scrollY
}

watch(scrollY, () => {
        if (scrollY.value < 200) {
                isGray.value = false
                inStyle.value = `bg-secondary border-b-0`
        } else {
                isGray.value = true
                inStyle.value = `bg-third-color border-b-[1px] border-primary`
        }
})

</script>
