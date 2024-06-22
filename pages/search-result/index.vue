<template>
    <main v-if="pending" class="min-h-[60vh]">
        <Loading />
    </main>
    <main v-else-if="product && product?.length > 0" class="min-h-svh flex flex-col items-center justify-between py-[50px]" :class="[{'pt-[70px]': !isMobile}]">
        <section>
            <div v-if="isQuery" class="flex flex-col w-full container px-5 pt-10 md:py-0">
                <h3 class="font-bold">Result of '{{ keyword }}'</h3>
                <h5>{{ product?.length}} items found</h5>
            </div>
            <div id="items-found" class="py-10">
                <ol class="
                    grid grid-cols-2 gap-4 justify-items-center max-w-[1319px]
                    md:grid-cols-3
                    lg:grid-cols-4
                ">
                    <li v-for="item in product" :key="item.id">
                        <Catalogue :id="stringToNumber(item.id)" :title="item.name" :image-src="item.product_image[0].image_url" :price="stringToNumber(item.price)"/>
                    </li>
                </ol>
            </div>
        </section>

        <div id="pagination" class="flex w-full justify-center items-center gap-4 py-10">
            <ButtonBgYellow sytle-css="rounded-[5px] text-bold p-1" @on-tap="onPreviousPage">
                <Icon name="ic:outline-arrow-back-ios" size="27" />
            </ButtonBgYellow>

            <p class="font-semibold text-lg">
                Page {{ page }} of {{ rowCount }}
            </p>

            <ButtonBgYellow sytle-css="rounded-[5px] text-bold p-1" @on-tap="onNextPage">
                <Icon name="ic:outline-arrow-back-ios" size="27" class="rotate-180"/>
            </ButtonBgYellow>
        </div>        
    </main>

    <main class="h-svh md:min-h-[45vh] flex justify-center items-center">
        <section class="flex flex-col items-center justify-center gap-5 py-[100px]">
            <NuxtImg src="/img/no-result.svg" :width="isMobile ? '200px' : '350px'" :height="isMobile ? '190px' : '340px'"/>
            <article class="flex flex-col justify-center items-center font-Inconsolata text-primary md:ml-5">
                <h3 class="font-black tracking-widest text-[30px] md:text-[40px]">no results found</h3>
                <p>We couldn’t find you searched for</p>
                <p>Try searching again</p>
            </article>
        </section>
    </main>
</template>

<script setup lang="ts">
import type { ICatalogue, ISearchResult } from '~/types/database/product';

const { isMobile } = useScreen()
const client = useSupabaseClient()
const route = useRoute()

const keyword = ref<string>('')
const isQuery = ref<boolean>(false)

const setKeyword = () => {
    if (Object.keys(route.query).length > 0) {
        isQuery.value = true
        if (route.query.search !== null && route.query.search !== undefined && route.query.hasOwnProperty('search')) {
            keyword.value = route.query.search?.toString()
        }
    }
}
setKeyword()

const page = ref<number>(1)
const start = ref<number>(0)
const offset = ref<number>(11)

const { data: product, pending, error, status ,refresh } = useLazyAsyncData('search-result', async () => {
    if(isQuery.value) {
        const { data,error } = await client.from('product').select(`*,product_image(id,image_url)`).ilike('name', `%${keyword.value}%`).order('sell_out',{ ascending: false }).range(start.value, offset.value).returns<ICatalogue[]>()
        if (error) {
            console.log('error = ',error);   
            throw createError({
                statusMessage: error?.message,
                statusCode: 404,
                message: error?.message,
            })
        }
        return data
    } else {
        const { data,error } = await client.from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).range(start.value, offset.value).returns<ICatalogue[]>()
        if (error) {
            console.log('error = ',error);   
            throw createError({
                statusMessage: error?.message,
                statusCode: 404,
                message: error?.message,
            })
        }
        return data
    }
})

const { data: rowCount, error: errorCount, status: statusCount } = useLazyAsyncData('row', async () => { 
    if (isQuery.value) {
        const { count, error } = await client.from('product').select(`*,product_image(id,image_url)`, { count: 'exact', head: true }).ilike('name', `%${keyword.value}%`)
        if (error) {
            console.log('errorCount = ',error);   
            throw createError({
                statusMessage: error?.message,
                statusCode: 404,
                message: error?.message,
            })
        }

        let rowCount: number = 0
        if (count !== null) {
            if(count % 12 > 0 && count % 12 <= 5) {
                rowCount = Math.round(count / 12) +1
            } else {
                rowCount = Math.round(count / 12)
            }
            
        }

        return rowCount
    } else {
        const { count, error } = await client.from('product').select(`*,product_image(id,image_url)`, { count: 'exact', head: true })
        if (error) {
            console.log('errorCount = ',error);   
            throw createError({
                statusMessage: error?.message,
                statusCode: 404,
                message: error?.message,
            })
        }

        let rowCount: number = 0
        if (count !== null) {
            if(count % 12 > 0 && count % 12 <= 5) {
                rowCount = Math.round(count / 12) +1
            } else {
                rowCount = Math.round(count / 12)
            }
        }

        return rowCount
    }
}) 

watch(() => route.query.search, () => {
    setKeyword()
    refresh()
})

const onNextPage = () => {
    if(page.value < (rowCount?.value ?? 0)) {
        offset.value = offset.value + 12
        start.value = start.value + 12
        page.value = page.value + 1
        refresh()
    }
}
const onPreviousPage = () => {
    if(page.value > 1) {
        offset.value = offset.value - 12
        start.value = start.value - 12
        page.value = page.value - 1
        refresh()
    }
}

</script>