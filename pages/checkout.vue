<template>
  <main class="pt-[100px] pb-[90px] px-2 flex flex-col items-center gap-10 bg-gray-v1 md:gap-20">
    <h1 class="px-3 py-1 bg-primary font-semibold text-2xl text-third-color inline-block tracking-wider">
      <span v-if="isMobile">Summary</span>
      <span v-else>Checkout</span>
    </h1>
    <div class="container max-w-[1337px] flex flex-row gap-4">
      <div id="left" class="flex-grow-[9] flex flex-col gap-4">
        <div id="address"
          class="flex flex-col gap-2 px-4 py-6 bg-third-color border rounded-md shadow-[4px_4px_4px_0px_#9C9C9C40] order-2 md:order-1">
          <h2 class="text-2xl font-bold tracking-wide">Shipping Address</h2>
          <button
            class="flex flex-row bg-primary items-center justify-center gap-2 text-third-color py-1 px-2 max-w-[150px] rounded-lg"
            @click="addAddress">
            <div v-if="!isAddressShow">
              <Icon name="ic:round-plus" />
              <span>add address</span>
            </div>
            <div v-else>
              <Icon name="ic:round-plus" />
              <span>update address</span>
            </div>
          </button>
          <div v-if="isAddressShow" class="py-5 border-t-[1px] mt-5 flex flex-col">
            <strong>Delivery Address</strong>
            <div class="flex flex-col max-w-[400px] text-sm mt-3">
              <div class="flex flex-row gap-2 items-center ">
                <p>Contact Name</p>
                <p>:</p>
                <p>{{ user.name }}</p>
              </div>
              <div class="flex flex-row gap-2 items-center w-full">
                <p>Address : </p>
                <p>{{ user.address }}</p>
              </div>
              <div class="flex flex-row gap-2 items-center w-full">
                <p>District : </p>
                <p>{{ user.district }}</p>
              </div>
              <div class="flex flex-row gap-2 items-center w-full">
                <p>City : </p>
                <p>{{ user.city }}</p>
              </div>
              <div class="flex flex-row gap-2 w-full">
                <p>Province : </p>
                <p>{{ user.province }}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="checkout"
          class="px-8 py-6 bg-third-color border rounded-md shadow-[4px_4px_4px_0px_#9C9C9C40] flex flex-col gap-5 order-1 md:order-2">
          <div id="checkout-items" v-for="product in products" :key="product.id"
            class="flex flex-row items-center p-3 shadow-[4px_4px_4px_0px_#9C9C9C40] gap-2">
            <div class="">
              <img :src="imageSrc" width="80px" class="rounded-md overflow-clip">
            </div>

            <div class="flex flex-col p-3">
              <h4 class="font-semibold">{{ product.title }}</h4>
              <p class="">{{ product.qty }} Pcs</p>
              <p>{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop only -->
      <div v-if="!isMobile" id="right" class="flex-grow-[3] max-w-[250px] flex flex-col gap-4">
        <div id="summary"
          class="bg-third-color border-2 border-primary h-[350px] p-4 rounded-md shadow-[4px_4px_4px_0px_#A5A5A540] flex flex-col relative">
          <h3 class="font-bold tracking-wide">Summary</h3>

          <div class="mt-4 flex flex-col">
            <div class="flex justify-between">
              <p>Sub total</p>
              <strong>Rp {{ subTotal }}</strong>
            </div>
            <div class="flex justify-between">
              <p>Discount</p>
              <strong>- Rp {{ discount }}</strong>
            </div>
            <div class="flex justify-between">
              <p>Total Shipping</p>
              <strong>Rp {{ shippingPrice }}</strong>
            </div>
          </div>

          <div class="border my-2" />

          <div class="py-2 flex flex-row font-bold text-xl justify-between">
            <p>Total</p>
            <p>Rp {{ totalPayments }}</p>
          </div>

          <div class="absolute bottom-0 flex justify-center w-full -ml-4 pb-3 px-4">
            <ButtonBgYellow title="Place Order" sytle-css=" w-full py-1 " @on-tap="submit" />
          </div>

        </div>
        
        <div class="bg-third-color rounded-md px-3 py-3 flex flex-col gap-3 border">
          <h3 class="font-Dela-Gothic-One text-sm tracking-wider">Project 88</h3>
          <p class="text-sm">Project-88 keeps your information and payment safe</p>
        </div>
      </div>
    </div>
  </main>

  <!-- Mobile only -->
  <BottomNavTransaction v-if="isMobile" title="Total Payments" :total-payment="totalPayments" title-button="checkout" @on-tap="submit"/>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'checkout'
})

const { isMobile } = useScreen()

const addAddress = () => {
  revertBoolean(isAddressShow)
}

const isAddressShow = ref<boolean>(false)

const revertBoolean = (input: globalThis.Ref<boolean>) => {
  input.value = !input.value
}

const user = {
  name: 'muhammad rizki',
  address: 'Jl. Tangen',
  district: 'Tangen',
  city: 'Sragen',
  province: 'Jawa Tengah'
}

const imageSrc = ref<string>('/img/products/product-example-1.png')
const title = ref<string>('Product Title 1')
const qty = ref<string>('')

const products = [
  {
    id: '1',
    imageSrc: '/img/products/product-example-1.png',
    title: 'Product Title 1',
    qty: 10,
    price: 'Rp. 99999999'
  },
  {
    id: '2',
    imageSrc: '/img/products/product-example-1.png',
    title: 'Product Title 2',
    qty: 12,
    price: 'Rp. 99999999'
  },
  {
    id: '3',
    imageSrc: '/img/products/product-example-1.png',
    title: 'Product Title 3',
    qty: 13,
    price: 'Rp. 99999999'
  },
  {
    id: '14',
    imageSrc: '/img/products/product-example-1.png',
    title: 'Product Title 4',
    qty: 14,
    price: 'Rp. 99999999'
  },
  {
    id: '15',
    imageSrc: '/img/products/product-example-1.png',
    title: 'Product Title 15',
    qty: 15,
    price: 'Rp. 99999999'
  },
]

const subTotal = ref<string>('99999999')
const discount = ref<string>('10000')
const shippingPrice = ref<string>('900000')
const totalPayments = ref<number>(99989000)

const submit = () => {

}

</script>

<style scoped></style>