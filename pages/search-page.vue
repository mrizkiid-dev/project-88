<template>
    <AppbarSearchMobile :is-gray="true" in-style="bg-third-color border-b-[1px] border-primary" v-model="searchAppBar"/>
    <div class="pt-[90px] px-2 flex flex-col gap-2">
      <SearchSuggestion :is-mobile="true" v-for="data in searchResult" :title="data.title" :image-src="data.image" :price="data.price" />
    </div>
    <Bottomnav />
</template>

<script setup lang="ts">
import type { IProduct } from '~/types/components/searchResult';

const store = useAppStore()

const searchAppBar = ref<string>()
const searchResult = ref<IProduct[]>()
searchResult.value = [
    {image: '/img/product-example-1.png',title: 'title product example 1',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 2',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 3',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 4',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 5',price: 'Rp. 87.200'},
    {image: '/img/product-example-1.png',title: 'title product example 6',price: 'Rp. 87.200'},
]

</script>
