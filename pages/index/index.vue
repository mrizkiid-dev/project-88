<template>
    <header class="bg-secondary w-full h-[400px] md:h-[90vh] flex flex-row pt-[60px] background-grid-homepage">

        <div class="flex flex-1 items-center justify-center">
            <div class="flex flex-col justify-start items-start border-third-color w-max-[50px]">
                <span class="highlight-text">Go Grab</span>
                <span class="highlight-text">Your</span>
                <span class="highlight-text">Favourite</span>
                <span class="highlight-text">Merch</span>
            </div>  
        </div>

        <div class="flex flex-1 items-end justify-center">
            <div class="container flex items-end h-[90%] max-w-[200px] md:max-w-[400px] ">
                <div class="container bottom-0 flex justify-center items-center w-full">
                    <img src="/img/hand-with-case.png" class="w-full" alt="" width="">
                </div>
            </div>
        </div>

    </header>

    <section id="best-seller" class="bg-primary relative pt-3 text-third-color tracking-widest font-Inconsolata px-1 sm:px-4 md:px-10 w-full">
        <div id="headline" class="marquee-w text-xl md:text-2xl">
            <div class="marquee">
                <span>{{ headline }}&nbsp;</span> 
            </div>
            <div class="marquee marquee2">
                <span>{{ headline }}</span>
            </div>
        </div>
        <div v-if="!loadingBestSeller && bestSeller" class="relative">

            <div class="text-5xl font-black flex flex-col justify-center items-start visible absolute z-[1] pr-5 h-full md:text-7xl">
                <p>Best</p>
                <p>selling</p>
                <p>product</p>
                <p>for you</p>
            </div>
            <ol ref="el" id="best-seller-product" class="py-4 md:py-10 flex flex-row gap-3 relative overflow-x-scroll scroll-smooth no-scrollbar scrolling-wrapper" :onscroll="scrollBestSeller">
                <li>
                    <h1 class="text-5xl font-black flex flex-col justify-center items-start invisible relative z-[2] pr-5 md:text-7xl">
                        <p>Best</p>
                        <p>selling</p>
                        <p>product</p>
                        <p>for you</p>
                    </h1>
                </li>
                <li v-for="product in bestSeller" :key="product.id" class="relative z-[2]" > 
                    <Catalogue :id="stringToNumber(product.id)" :title="product.name" :image-src="product.product_image[0].image_url" :price="stringToNumber(product.price)"/>
                </li>
            </ol>

            <!-- <div v-if="isMobile" id="button-arrow" class="absolute top-0 z-[3] w-full h-full px-5">
                
                <div class="flex items-center justify-between w-full h-full">
                    <button class="bg-gray-v1 py-2 border border-primary" :class="[{'visible' : isLeftArrow},{'invisible': !isLeftArrow}]" @click="goLeft">
                        <Icon name="ep:arrow-left-bold" size="20" class="text-primary"/>
                    </button>
                    <button class="bg-gray-v1 py-2 border border-primary" @click="goRight">
                        <Icon name="ep:arrow-left-bold" size="20" class="rotate-180 text-primary"/>
                    </button>
                </div>
            </div> -->

        </div> 
        <div v-if="!isMobile" class="absolute h-full z-[3] top-72 left-1">
            <button class="bg-gray-v1 py-2 min-w-5 border border-primary" :class="[{'visible' : isLeftArrow},{'invisible': !isLeftArrow}]" @click="goLeft">
                <Icon name="ep:arrow-left-bold" size="20" class="text-primary"/>
            </button>
        </div>

        <div v-if="!isMobile" class="absolute h-full z-[3] top-72 right-1">
            <button class="bg-gray-v1 min-h-10 py-2 border border-primary" :class="[{'visible' : isRightArrow},{'invisible': !isRightArrow}]" @click="goRight">
                <Icon name="ep:arrow-left-bold" size="20" class="rotate-180 text-primary"/>
            </button>
        </div>

    </section>

    <section v-if="catalogue" id="catalogue" class="pt-28 pb-40 flex flex-col items-center justify-center gap-16 bg-[#F8F7F4]">
        <ol class="
                grid grid-cols-2 gap-4 justify-items-center max-w-[1319px]
                md:grid-cols-3
                lg:grid-cols-4    
            ">
            <li v-for="list in catalogue">
                <Catalogue :id="stringToNumber(list.id)" :title="list.name" :image-src="list.product_image[0].image_url" :price="stringToNumber(list.price)"/>
            </li>
        </ol>
        <ButtonDarkMd title="see more ..." styleCss="max-w-[300px] h-[20px]" @onClick="seeMore"/>
    </section>

</template>

<script setup lang="ts">
import type { IDatabase } from '~/types/database/supabase'
import type { IProduct, IProductImage, ICatalogue } from '~/types/database/product'
definePageMeta({
    layout: 'home-page'
})

const { isMobile } = useScreen()
const client = useSupabaseClient<IDatabase>()

// BEST-SELLER
const headline = ref<string>(` Welcome to our store | We have a lot of merch design that perhaps suit with your preferences | These are our best seller | `)
const { data: bestSeller, pending: loadingBestSeller, error: errorBestSeller, refresh } = useLazyAsyncData('best-seller', async () => {
    const { data,error } = await client.from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).limit(7).returns<ICatalogue[]>()
    if (error) {
        console.log('error = ',error);   
        throw createError({
            statusMessage: error?.message,
            statusCode: 404,
            message: error?.message,
        })
    }
    return data
},)

// arrow best seller
const el = ref<HTMLElement | null>(null)
const isLeftArrow = ref<boolean>(false)
const isRightArrow = ref<boolean>(true)
const goLeft = async () => {
    if (el.value) {
        el.value.scrollLeft -= 400
    }
}
const goRight = () => {
    if (el.value) {
        el.value.scrollLeft += 400
        
    }
}
const changeIsLeftArrow = (x: number) => {
    if (x > 50) {
        isLeftArrow.value = true
    } else {
        isLeftArrow.value = false
    }

    if (el.value !== undefined && el.value !== null) {
        if (x + el.value?.offsetWidth >= el.value?.scrollWidth) {
            isRightArrow.value = false
        } else {
            isRightArrow.value = true
        }
    }
}

const scrollBestSeller = async () => {
    if(el.value !== undefined && el.value !== null) {
        changeIsLeftArrow(el.value?.scrollLeft)
    }
}




// CATALOGUE
const { data: catalogue, pending: loadingCatalogue, error: errorCatalogue, refresh: refreshCatalogue } = useLazyAsyncData('catalogue', async () => {
    const { data,error } = await client.from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).range(8, 19).returns<ICatalogue[]>()
    if (error) {
        console.log('error = ',error);   
        throw createError({
            statusMessage: error?.message,
            statusCode: 404,
            message: error?.message,
        })
    }
    return data
},
    // {
    //     server: false
    // }
)
const seeMore = () => {
    navigateTo({
        path: 'search-result',
    })
}


</script>