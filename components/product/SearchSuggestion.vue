<template>
    <div v-if="isMobile" class="flex flex-row gap-2 p-2 px-4 w-full rounded-md items-center justify-start cursor-pointer" :class="`shadow-[2px_2px_4px_0px_#B3B3B3${getOpaque(25)}]`" @click="routeToProduct">
        <img :src="imageSrc" alt="" width="40px" class="rounded-md">
        <div class="flex flex-col items-start justify-center">
            <p class="text-sm">{{ title }}</p>
            <p class="text-sm font-semibold">{{ price }}</p>
        </div>
    </div>

    <div v-else class="flex flex-row gap-2 p-2 px-4 w-full rounded-md items-center justify-between shadow-[2px_2px_4px_0px_#B3B3B340] cursor-pointer" :class="`shadow-[2px_2px_4px_0px_#B3B3B3${getOpaque(25)}]`" @click="routeToProduct">
        <div class="flex flex-row items-center gap-2">
            <img :src="imageSrc" alt="" width="63px" class="rounded-md">
            <p>{{ title }}</p>
        </div>
        <b>{{ price }}</b>
    </div>
</template>

<script setup lang="ts">
const { isMobile, imageSrc, title, price, id } = defineProps<{
    isMobile?: boolean,
    id: string | number,
    imageSrc?: string,
    title: string, 
    price?: string,
}>()

const routeToProduct = () => {
    navigateTo(`/product/${id}`)
}
</script>