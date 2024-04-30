<template>
    <article class="border border-primary rounded-3xl w-[150px] sm:w-[200px] md:w-[220px] xl:w-[270px] flex flex-col overflow-hidden">
        <img :src="imageSrc" alt="" class="w-full border-b-2 border-primary cursor-pointer" @click="onTapProduct">
        <!-- <img src="/img/product-example-1.png" alt="" class="w-full border-b-2 border-primary"> -->
        <div id="product-detail" class="text-primary bg-third-color flex flex-col items-start justify-start px-4 py-1 gap-0 md:gap-2">
            <h2 id="title-product" class="overflow-hidden text-ellipsis line-clamp-2 text-base">
                {{ title }}
            </h2>
            <h3 id="price" class="font-bold text-base md:text-xl">
                Rp.{{ price }}
            </h3>
            <div id="see-more" class="flex w-full justify-end">
                <button class="flex flex-row items-center gap-2 rounded-md border bg-secondary text-primary font-semibold text-base py-1 px-2 mt-5 mb-3 md:text-xl cursor-pointer" @click="onTapProduct1">
                    <span>buy</span>
                    <Icon name="uil:cart" class="font-bold"/>
                </button>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">

const {id, imageSrc, title, price} = defineProps<{
    id: string
    imageSrc: string
    title: string
    price: string
}>()

const onTapProduct = () => {
    navigateTo({
        path:   `/product/${id}`,
    })
}
const onTapProduct1 = () => {
    console.log('product1')
}

</script>