<template>
    <main id="product-detail" class="flex justify-center items-center pt-10 pb-14 md:bg-gray-v1 md:pt-24">
        <div class="
                container bg-third-color rounded-3xl flex flex-col p-5 py-14 gap-10
                md:border md:gap-4 
                lg:flex-row lg:justify-start lg:items-start
                xl:max-w-[1200px]
            ">

            <div id="left" class="basis-full flex flex-col items-center justify-center gap-3 border-2 border-primary rounded-2xl md:border-none overflow-clip">
                <img :src="displayImage" alt="" class="w-full rounded-xl md:max-w-[560px]">
                <div class="flex flex-row flex-wrap gap-3 p-3">
                    <img v-for="image in images" :key="image.id" :src="image.imageSrc" alt="" 
                        class="max-w-[55px] rounded-[10px] border overflow-clip cursor-pointer md:border-none md:max-w-[69px]" 
                        :class="[{'opacity-100': image.isChoose}, {'opacity-50': !image.isChoose}]"
                        @click=setDisplayImage(image)
                    >
                </div>
            </div>

            <div id="right" class="basis-full flex flex-col items-stretch justify-between gap-20 lg:gap-12">
                <div class="flex flex-col gap-5 h-full">
                    <h2 id="title" class="font-extrabold font-Inconsolata text-xl md:text-2xl">{{ detailProduct.title }}</h2>
                    <p id="description" class="text-base md:text-lg">{{ detailProduct.description }}</p>
                    <div class="w-full">
                        <span class="font-black text-third-color inline-block text-lg px-3 py-2 bg-primary md:text-xl">Rp. {{ detailProduct.price }}</span>
                    </div>
                </div>
                <ButtonBgYellow sytle-css="w-full mx-auto md:w-[500px] border-2 border-primary">
                    <div class="flex flex-row justify-center items-center py-3 text-2xl gap-2">
                        <span class="font-bold tracking-wider text-lg md:text-xl">add to cart</span>
                        <Icon name="uil:cart" size="30px"/>
                    </div>
                </ButtonBgYellow>
            </div>

        </div>
    </main>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'product-detail'
})

const route = useRoute()
const images = ref([
    {id: '1', imageSrc: '/img/products/product-example-1.png', isChoose: true},
    {id: '2', imageSrc: '/img/products/product-example-2.png', isChoose: false},
    {id: '3', imageSrc: '/img/products/product-example-3.png', isChoose: false},
    {id: '4', imageSrc: '/img/products/product-example-4.jpg', isChoose: false},
    {id: '5', imageSrc: '/img/products/product-example-5.png', isChoose: false},
])
const displayImage = computed(() => {
    let image = images.value.find(image => image.isChoose)
    return image?.imageSrc
})

const setDisplayImage = (image: any) => {
    let imageResult = images.value.find(image => image.isChoose)
    if (imageResult != undefined) {
        imageResult.isChoose = false
    }
    image.isChoose = !image.isChoose
}

const detailProduct = ref({
    title: 'Title',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    price: '87.250'
})


</script>
