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
                <span>{{ bestSeller.headline }}</span> 
            </div>
            <div class="marquee marquee2">
                <span> {{ bestSeller.headline }}</span>
            </div>
        </div>
        <div class=relative>
            <div class="text-5xl font-black flex flex-col justify-center items-start visible absolute z-[1] pr-5 h-full md:text-7xl">
                <p>Best</p>
                <p>selling</p>
                <p>product</p>
                <p>for you</p>
            </div>
            <ol id="best-seller-product" class="py-4 md:py-10 flex flex-row gap-3 relative overflow-y-scroll no-scrollbar ">
                <h1 class="text-5xl font-black flex flex-col justify-center items-start invisible relative z-[2] pr-5 md:text-7xl">
                    <p>Best</p>
                    <p>selling</p>
                    <p>product</p>
                    <p>for you</p>
                </h1>
                <li v-for="element in bestSeller.datas" class="relative z-[2]"> <Catalogue /> </li>
            </ol>
        </div>
    </section>

    <section id="catalogue" class="pt-28 pb-40 flex flex-col items-center justify-center gap-16 bg-[#F8F7F4]">
        <ol class="
                grid grid-cols-2 gap-4 justify-items-center max-w-[1319px]
                md:grid-cols-3
                lg:grid-cols-4    
            ">
            <li v-for="list in catalogue">
                <Catalogue />
            </li>
        </ol>
        <ButtonDarkMd title="see more ..." styleCss="max-w-[300px] h-[20px]"/>
    </section>

</template>

<script setup lang="ts">

const { isMobile } = useScreen()
const bestSeller = reactive({
    headline: ' Welcome to our store | We have a lot of merch design that perhaps suit with your preferences | These are our best seller | ',
    datas: [
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
    ],
})

const catalogue = ref([
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
    ]) 

</script>