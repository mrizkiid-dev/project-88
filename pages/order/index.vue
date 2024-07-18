<template>
    <main class="pt-[100px] pb-[90px] px-2 flex flex-col items-center gap-10 bg-gray-v1 md:gap-20">
        <h1 class="
                md:bg-primary md:font-semibold md:text-third-color md:inline-block md:tracking-wider
                md:px-3 md:py-1 md:text-2xl
                hidden
        ">
            Order
        </h1>

        <section v-if="orders.length < 1" class="h-screen flex flex-col items-center justify-center gap-6">
            <NuxtImg src="/img/empty-cart.svg" width="188px" height="289px" class="mt-14"/>
            <h2 class="font-Inconsolata tracking-[0.3em] font-black text-2xl">EMPTY</h2>
        </section>

        <section v-else id="orders" class="bg-none container max-w-[1300px] p-10 rounded-lg flex flex-col gap-10 md:border md:bg-third-color">
            <div v-for="order in orders" class="flex flex-col bg-third-color overflow-clip rounded-sm border cursor-pointer" @click="onNavigate(order.orderId)">
                <div class="bg-primary flex flex-col px-3 py-1 pb-2">
                    <h3 class="text-base text-third-color font-semibold md:text-2xl">Order ID : {{ order.orderId }}</h3>
                    <div>
                        <span class="bg-third-color text-sm px-1 inline-block"> Order date : {{ onParseDate(order.orderDate) }}</span>
                    </div>
                </div>
                <div class="flex flex-col px-5 py-3 gap-3">
                    <div v-for="item in order.items" 
                        class="shadow-[4px_4px_4px_0px_#A5A5A540] flex flex-row rounded-sm p-2 overflow-clip gap-2"
                    >
                        <div class="flex justify-center items-center">
                            <!-- TODO change to empty image in the future -->
                            <img :src="item.imageSrc ?? `/img/products/product-example-5.png`" alt="" :width="isMobile ? `40px` : `70px`" :height="isMobile ? `40px` : `70px`" class="rounded-sm" >
                        </div>
                        <div class="flex flex-col">
                            <h4 class="font-semibold text-sm md:text-lg">{{ item.title }}</h4>
                            <p class="text-sm md:text-lg">{{ item.qty }}</p>
                            <p class="text-sm md:text-lg">Rp {{ numberTocurrency(item.totalPrice) }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end pr-8 py-3 gap-10 text-sm md:text-xl">
                    <strong>Total :</strong>
                    <strong>Rp {{ numberTocurrency(order.totalPayment) }}</strong>
                </div>
            </div>

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
        </section>

    </main>
</template>

<script setup lang="ts">
import { getOrderPagination, getTotalOrdersRow } from '~/data/repository/order_impl';
import type { TOrdersComponent, TOrdersItemComponent, TResponseOrder } from '~/types/components/order';

definePageMeta({
    layout: 'order'
})

const { isMobile } = useScreen()
const supabaseClient = useSupabaseClient()

const orders = ref<TOrdersComponent[]>([])
const rowCount = ref<number>(0)

const page = ref<number>(1)
const start = ref<number>(0)
const offset = ref<number>(4)

const parseData = (data: TResponseOrder[] | null,count: number | null) => {
    if (data && data.length > 0) {
    orders.value = []
    data.forEach(item => {
        let products: TOrdersItemComponent[] = []
        item.order_item.forEach(element => {
            let product = {} as TOrdersItemComponent
            product.id = element.product_id,
            product.title = element.product_name,
            product.imageSrc = element.image_url,
            product.qty = element.quantity,
            product.totalPrice = element.price * element.quantity
            products.push(product)
        });
        const order: TOrdersComponent = {
            orderId: item.id,
            orderDate: item.created_at,
            totalPayment: item.total_payment,
            items: products
        }

        orders.value.push(order)
    })
    }

    if (count !== null) {
        if(count % 5 > 0 && count % 5 <= 2) {
            rowCount.value = Math.round(count / 5) +1
        } else {
            rowCount.value = Math.round(count / 5)
        }
    }
}

const fetchData = async () => {
    const profileStore = useProfileStore()
    // -- old
    // const {data, error} = await supabaseClient.from('order').select('id,created_at,total_payment,order_item(product_id,product_name,quantity,price,image_url)')
    //                         .eq('shopping_session_id',profileStore.sessionId)
    //                         .range(start.value, offset.value)
    //                         .limit(2, { foreignTable: 'order_item' }).order('id',{ ascending: false })
    //                         .returns<TResponseOrder[]>()

    // --new
    const { data, error } = await getOrderPagination({
        sessionId: profileStore.sessionId,
        start: start.value,
        offset: offset.value
    })

    // -- old
    // const {count, error:errorCount} = await supabaseClient.from('order').select('id', { count: 'exact', head: true }).eq('shopping_session_id',profileStore.sessionId)

    // -- new
    const { count, error:errorCount } = await getTotalOrdersRow(profileStore.sessionId)
    return { data, error, count, errorCount }
}

const refresh = async() => {
    const { data, error, count, errorCount } = await fetchData()
    parseData(data, count)

    if (error) {
        console.log('error order = ',error);
    }

    if (errorCount) {
        console.log('error order = ',errorCount);
    }
}

await refresh()

const onNextPage = async() => {
    if(page.value < rowCount.value) {
        offset.value = offset.value + 5
        start.value = start.value + 5
        page.value = page.value + 1
        await refresh()
    }
}
const onPreviousPage = async () => {
    if(page.value > 1) {
        offset.value = offset.value - 5
        start.value = start.value - 5
        page.value = page.value - 1
        await refresh()
    }
}

const onNavigate = (id: number) => {
    navigateTo(`/order/${id}`)
}

</script>

<style lang="scss" scoped>

</style>