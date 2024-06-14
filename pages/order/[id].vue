<template>
    <main class="py-[80px] min-h-[46svh] px-4 flex flex-col items-center gap-10 bg-gray-v1 md:gap-20 md:px-">
        <h1 class="px-3 py-1 bg-primary font-semibold text-2xl text-third-color inline-block tracking-wider">
            <span v-if="isMobile">Order Detail</span>
            <span v-else>Order Detail</span>
        </h1>

        <!-- START #MAIN-CONTAINER -->
        <div id="main-container" class="container max-w-[1337px] flex flex-col md:flex-row gap-4">

        <!-- START #LEFT -->
        <div id="left" class="flex-grow-[9] flex flex-col gap-4">

        <div id="address"
            class="flex flex-col gap-2 px-4 py-6 bg-third-color border rounded-md shadow-[4px_4px_4px_0px_#9C9C9C40] order-2 md:order-1">
            <h2 class="text-lg font-bold tracking-wide md:text-2xl">Shipping Address</h2>
            <div class="py-5 border-t-[1px] mt-5 flex flex-col">
                <strong>Delivery Address</strong>
                <div class="flex flex-col max-w-[400px] text-sm mt-3">
                    <div class="flex flex-row gap-2 items-center ">
                        <p>Contact Name</p>
                        <p>:</p>
                        <p>{{ userDetail.name }}</p>
                    </div>
                    <div class="flex flex-row gap-2 items-center w-full">
                        <p>Address : </p>
                        <p>{{ userDetail.detailAddress }}</p>
                    </div>
                    <div class="flex flex-row gap-2 items-center w-full">
                        <p>City : </p>
                        <p>{{ userDetail.province }}</p>
                    </div>
                    <div class="flex flex-row gap-2 w-full">
                        <p>Province : </p>
                        <p>{{ userDetail.city }}</p>
                    </div>
                    <div class="flex flex-row gap-2 items-center w-full">
                        <p>Phone Number : </p>
                        <p>{{ profileStore.phoneNumber }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- #ITEMS-ORDER -->
        <div id="items-order"
            class="p-4 bg-third-color border rounded-md shadow-[4px_4px_4px_0px_#9C9C9C40] flex flex-col gap-5 order-1 md:order-2 md:px-8 md:py-6">
            <div id="checkout-items" v-for="product in itemOrder" :key="product.id"
                class="flex flex-row items-center px-3 shadow-[4px_4px_4px_0px_#9C9C9C40] gap-2 md:p-3">
                <!-- TODO change to empty image -->
                <img :src="product.imageSrc ?? `/img/empty-image.png`" :width="isMobile ? `60px` : `80px`" class="rounded-md overflow-clip">
                <div class="flex flex-col p-3 text-sm md:text-xl">
                    <h4 class="font-semibold">{{ product.title }}</h4>
                    <p class="">{{ product.qty }} Pcs</p>
                    <p>Rp. {{ numberTocurrency(product.totalPrice) }}</p>
                </div>
            </div>
        </div>

        </div>
        <!-- END #LEFT -->

        <div id="right" class="flex-grow-[3] w-full md:max-w-[300px] flex flex-col gap-4">
            <div id="summary"
                class="bg-third-color border-2 border-primary h-[350px] p-4 rounded-md shadow-[4px_4px_4px_0px_#A5A5A540] flex flex-col relative">
                <h3 class="font-bold tracking-wide">Summary</h3>

                <div class="mt-4 flex flex-col">
                    <div class="flex justify-between">
                        <p>Sub total</p>
                        <strong>Rp {{ numberTocurrency(detailOrder.subTotal) }}</strong>
                    </div>
                    <!-- COMMENTED FOR FUTURE USE -->
                    <!-- <div class="flex justify-between">
                        <p>Discount</p>
                        <strong>- Rp {{ discount }}</strong>
                    </div> -->
                    <div v-if="detailOrder.shipping.price && detailOrder.shipping.price > 0" class="flex flex-row justify-between">
                        <p>Shipping</p>
                        <div class="flex flex-col items-end">
                            <strong>Rp {{ numberTocurrency(detailOrder.shipping.price) }}</strong>
                        </div>
                    </div>
                </div>

                <div class="border my-2" />

                <div class="py-2 flex flex-row font-bold text-xl justify-between">
                    <p>Total</p>
                    <p>Rp {{ numberTocurrency(detailOrder.totalPayment) }}</p>
                </div>

                <div class="absolute bottom-0 flex justify-center w-full -ml-4 pb-3 px-4">
                    <ButtonBgYellow title="Check Status Payment" sytle-css=" w-full py-1 " @on-tap="submit" />
                </div>

            </div>
            <!-- END #Summary -->

            <div class="bg-third-color rounded-md px-3 py-3 flex flex-col gap-3 border">
                <h3 class="font-Dela-Gothic-One text-sm tracking-wider">Project 88</h3>
                <p class="text-sm">Project-88 keeps your information and payment safe</p>
            </div>

        </div>

        </div>
        <!-- END #MAIN-CONTAINER -->
    </main>
</template>

<script setup lang="ts">
import type { TOrdersItemComponent } from '~/types/components/order';

const { isMobile } = useScreen()
const route = useRoute()
const supabaseClient = useSupabaseClient<any>()
const profileStore = useProfileStore()

type TDetailOrder = {
    id: number,
    createdAt: string,
    subTotal: number,
    totalPayment: number,
    shipping: {
        price: number,
        provider: 'POS-ID'
    }
}

type TUserDetail = {
    name: string
    province: string
    city: string
    detailAddress: string
}
const userDetail = ref<TUserDetail>({
    name: '',
    province: '',
    city: '',
    detailAddress: '',
})

const detailOrder = ref<TDetailOrder>({
    id: 0,
    createdAt: '',
    subTotal: 0,
    totalPayment: 0,
    shipping: {
        price: 0,
        provider: 'POS-ID'
    }
})
const itemOrder = ref<TOrdersItemComponent[]>([])

if (route.params.id) {
    const { data, error } = await supabaseClient.from('order').select('id,name_receiver,detail_address,city,city_id,province,province_id,created_at,shipping_price,sub_total,total_payment,order_item(product_id,product_name,quantity,price,image_url)').eq('id',route.params.id).limit(1)

    if (data && data.length > 0) {
        userDetail.value.name = data[0].name_receiver
        userDetail.value.province = data[0].province
        userDetail.value.city = data[0].city
        userDetail.value.detailAddress = data[0].detail_address

        detailOrder.value.id = data[0].id
        detailOrder.value.subTotal = data[0].sub_total
        detailOrder.value.shipping.price = data[0].shipping_price
        detailOrder.value.totalPayment = data[0].total_payment
        detailOrder.value.createdAt = data[0].created_at

        data[0].order_item.forEach((item: { product_id: number; product_name: string; image_url: string; quantity: number; price: number; }) => {
            let product = {} as TOrdersItemComponent
            product.id = item.product_id
            product.title = item.product_name
            product.imageSrc = item.image_url
            product.qty = item.quantity
            product.totalPrice = item.price * item.quantity
            itemOrder.value.push(product)
        })
    }

    if (error) {
        console.log('error order detail = ',JSON.stringify(error))
    }
}

const submit = () => {
    navigateTo(`/payment/${route.params.id}`)
}

</script>
