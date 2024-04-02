<template>
        <!-- <ClientOnly> -->
                <AppbarSearchMobile v-if="isMobile" :is-gray="isGray" :search-result="searchResult" bg="bg-secondary" v-model="searchAppBar" :in-style="inStyle"/>
                <AppbarSearch v-else v-model="searchAppBar" :search-result="searchResult"/>
        <!-- </ClientOnly> -->
        <!-- <div :class="isMobile ? 'pt-[60px]' : 'pt-[70px]'"/> -->
        <slot >
        </slot>
        <b>{{ searchAppBar }}</b>
        <!-- <ClientOnly>  -->
                <Bottomnav v-if="isMobile"/>
                <Footer v-else />
        <!-- </ClientOnly> -->
</template>

<script setup lang="ts">
import type {IProduct} from '~/types/components/searchResult'

const { isMobile, width } = useScreen()
const store = useAppStore()
store.isMobile = isMobile.value

const searchAppBar = defineModel<string>()
watch(searchAppBar, () => {
        console.log('aaa = ',searchAppBar.value);
})

const searchResult = ref<IProduct[]>([
    {image: '/img/product-example-1.png',title: 'title product example 1',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 2',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 3',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 4',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 5',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 6',price: 'Rp. 87.200'},
])

const isGray = ref<boolean>()
const inStyle = ref<string>()
const scrollY = ref<number>(0)

const handleScrolll = () => {
        console.log(window.scrollY);
        scrollY.value = window.scrollY
}

onBeforeMount (() => {
        window.addEventListener('scroll', handleScrolll)
},)

watch(scrollY, () => {
        if (scrollY.value < 200) {
                isGray.value = false
                inStyle.value = `bg-secondary border-b-0`
        } else {
                isGray.value = true
                inStyle.value = `bg-third-color border-b-[1px] border-primary`
        }
})

onBeforeUnmount (() => {
        window.removeEventListener('scroll', handleScrolll)
},)

</script>
