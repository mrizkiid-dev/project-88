<template>
    <main class=" pt-[100px] pb-[90px] px-2 flex flex-col items-center gap-10 bg-gray-v1 md:gap-20">
        <h1 class="
                md:bg-primary md:font-semibold md:text-third-color md:inline-block md:tracking-wider
                md:px-3 md:py-1 md:text-2xl
                hidden
        ">
            Order
        </h1>

        <div id="orders" class="bg-none container max-w-[1300px] p-10 rounded-lg flex flex-col gap-10 md:border md:bg-third-color">
            <div v-for="order in orders" class="flex flex-col bg-third-color overflow-clip rounded-sm border">
                <div class="bg-primary flex flex-col px-3 py-1 pb-2">
                    <h3 class="text-xl text-third-color font-semibold md:text-2xl">Order ID : {{ order.orderId }}</h3>
                    <div>
                        <span class="bg-third-color text-base px-1 inline-block"> Order date : {{ order.orderDate }}</span>
                    </div>
                </div>
                <div class="flex flex-col px-5 py-3 gap-3">
                    <div v-for="item in order.items" 
                        class="shadow-[4px_4px_4px_0px_#A5A5A540] flex flex-row rounded-sm p-2 overflow-clip gap-2"
                    >
                        <img src="/img/products/product-example-1.png" alt="" width="70px" class="rounded-sm" >
                        <div class="flex flex-col">
                            <h4 class="font-semibold text-lg">{{ item.title }}</h4>
                            <p>{{ item.qty }}</p>
                            <p>Rp {{ item.totalPrice }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end pr-8 py-3 gap-10 text-xl">
                    <strong>Total :</strong>
                    <strong>Rp {{ order.totalPayment }}</strong>
                </div>
            </div>
        </div>

    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'order'
})

const orders = [
    {
        orderId: '123456789123456789',
        orderDate: 'March 07, 2024',
        totalPayment: '999999999',
        items:[
            {
                id: '1',
                title: 'product-1',
                qty: '2 pcs',
                totalPrice: '100000'
            },
            {
                id: '2',
                title: 'product-2',
                qty: '2 pcs',
                totalPrice: '100000'
            },
            {
                id: '3',
                title: 'product-3',
                qty: '2 pcs',
                totalPrice: '200000'
            },
        ] ,
    },
    {
        orderId: '123456789123456780',
        orderDate: 'March 07, 2024',
        totalPayment: '999999999',
        items:[
            {
                id: '1',
                title: 'product-1',
                qty: '2 pcs',
                totalPrice: '100000'
            },
            {
                id: '2',
                title: 'product-2',
                qty: '2 pcs',
                totalPrice: '100000'
            },
            {
                id: '3',
                title: 'product-3',
                qty: '2 pcs',
                totalPrice: '200000'
            },
        ] ,
    },
    {
        orderId: '123456789123456781',
        orderDate: 'March 07, 2024',
        totalPayment: '999999999',
        items:[
            {
                id: '1',
                title: 'product-1',
                qty: '2 pcs',
                totalPrice: '100000'
            },
            {
                id: '2',
                title: 'product-2',
                qty: '2 pcs',
                totalPrice: '100000'
            },
            {
                id: '3',
                title: 'product-3',
                qty: '2 pcs',
                totalPrice: '200000'
            },
        ] ,
    },
    {
        orderId: '123456789123456782',
        orderDate: 'March 07, 2024',
        totalPayment: '999999999',
        items:[
            {
                id: '1',
                title: 'product-1',
                qty: '2 pcs',
                totalPrice: '100000'
            },
            {
                id: '2',
                title: 'product-2',
                qty: '2 pcs',
                totalPrice: '100000'
            },
            {
                id: '3',
                title: 'product-3',
                qty: '2 pcs',
                totalPrice: '200000'
            },
        ] ,
    },
]
</script>

<style lang="scss" scoped>

</style>