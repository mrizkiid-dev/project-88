<template>
  <main v-if="isMobile" class="pt-[60px]">
    <div class="flex flex-row items-center gap-3 pl-4 w-full h-[40px] border-b-[1px] fixed z-50 bg-third-color">
      <input type="checkbox" id="all-check" v-model="isAllCheck" class="checked:bg-primary">
      <label for="all-check"> Select all products </label>
    </div>
    <form @submit.prevent class="py-[80px] px-4">
      <ol class="flex flex-col gap-4">
        <CartCard v-for="cart in userTransactionStore.cartItems"
          :id="cart.id"
          :image-src="cart.imageSrc"
          :title="cart.title"
          :price="cart.price*cart.quantity"
          :quantity="cart.quantity"
          v-model:checked="checked"
          @increase="increment(cart)"
          @decrease="decrement(cart)"
          @delete-cart="deleteCart(cart)"
          :key="cart.id"
        />
      </ol>
      <BottomNavTransaction title="Total Payments" :total-payment="userTransactionStore.totalPayment" title-button="checkout" @on-tap="submit"/>
    </form>
  </main>

  <main v-else class="pt-[100px] pb-[60px] flex flex-col items-center gap-20 bg-gray-v1">
    <h1 class="px-2 py-1 bg-primary font-semibold text-xl text-third-color inline-block">Cart</h1>
    <div class="container max-w-[1337px] flex flex-row gap-4">
      <div id="left" class="flex-grow-[9] px-4 py-6 bg-third-color border flex flex-col rounded-md shadow-[4px_4px_4px_0px_#9C9C9C40]">
        <div class="flex flex-row justify-between">
          <h2 class="text-2xl font-semibold">Shopping Cart ({{ userTransactionStore.cartItems.length }})</h2>
        </div>

        <!-- <div id="select-all" class="flex flex-row items-baseline gap-2">
            <input type="checkbox" v-model="isAllCheck">
            <strong>Select all products</strong>
        </div> -->

        <div id="title" class="flex flex-row w-full pt-5 px-2 font-semibold">
          <div class="pl-4">

          </div>
          <div id="product-details" class="flex-grow-[3.2] max-w-[650px]">
            Product Details
          </div>
          <div id="quantity" class="flex-grow-[1] max-w-[120px] flex-center">
            <p>Quantity</p>
          </div>
          <div id="price" class="flex-grow-[1] max-w-[120px] flex-center">
            Price
          </div>
          <div id="total" class="flex-grow-[1] max-w-[120px] flex-center">
            Total
          </div>
          <div class="flex-grow-[1] max-w-5">
            
          </div>
        </div>

        <div v-for="cart in userTransactionStore.cartItems" :key="cart.id" class="flex flex-row gap-2">
          <input type="checkbox" :value="cart.id" v-model="checked"/>
          <div class="flex flex-row w-full p-2 border mt-2 font-semibold">
            <div id="product-details" class="flex-grow-[4] max-w-[650px]">
              <img src="/img/products/product-example-1.png" width="60px" height="60px" class="rounded-md"/>
            </div>
            <div id="quantity" class="flex-grow-[1] max-w-[120px] flex-row flex-center gap-2">
              <strong @click="decrement(cart)" class="text-xl cursor-pointer select-none">-</strong>
              <div class="p-3 w-[40px] h-[40px] border-2 border-primary flex justify-center items-center">{{ cart.quantity }}</div>
              <strong @click="increment(cart)" class="text-xl cursor-pointer select-none">+</strong>
            </div>
            <div id="price" class="flex-grow-[1] max-w-[120px] flex-center">
              <p>{{ cart.price }}</p>
            </div>
            <div id="total" class="flex-grow-[1] max-w-[120px] flex-center">
              <p>{{ (cart.price * cart.quantity) }}</p>
            </div>
            <div class="flex-grow-[1] flex max-w-5 items-center justify-center">
              x
            </div>
          </div>
        </div>

      </div>
      <div id="right" class="flex-grow-[3] bg-third-color border max-w-[250px] max-h-[350px] p-4 rounded-md shadow-[4px_4px_4px_0px_#00000040] relative">

        <h2 class="font-semibold tracking-wide text-xl">Summary</h2>

        <div class="my-[20px]">
          <div class="flex justify-between text-base">
            <p>Sub Total</p>
            <strong>Rp. {{ userTransactionStore.totalPayment }}</strong>
          </div>
          <div class="border my-2" />
          <div class="text-xl flex justify-between">
            <strong>Total</strong>
            <strong>Rp. {{ userTransactionStore.totalPayment }}</strong>
          </div>
        </div>

        <!-- <div class="flex justify-center mt-[150px]">
          <ButtonBgYellow title="checkout" sytle-css="px-12 py-1" @on-tap="submit"/>
        </div> -->

        <div class="absolute bottom-0 flex justify-center w-full -ml-4 pb-3 px-4">
          <ButtonBgYellow title="Place Order" sytle-css=" w-full py-1 " @on-tap="submit"/>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserTransactionStore } from '~/stores/user-transaction';
import type { ICart } from '~/types/pages/cart';

definePageMeta({
  layout: "cart",
});

const { isMobile } = useScreen()

const userTransactionStore = useUserTransactionStore()

const isAllCheck = ref<boolean>(false)
watch(isAllCheck, () => {
  userTransactionStore.totalPayment = 0
  if(isAllCheck.value) {
    userTransactionStore.cartItems.forEach((item) => {
      if(item.quantity > 0) {
        checked.value.push(item.id)
        item.checked = true
        userTransactionStore.totalPayment += (item.price * item.quantity) 
      } 
    })
  } else {
    userTransactionStore.cartItems.forEach((item) => {
      item.checked = false
    })
    checked.value = []
  }
})

const checked = ref<string[]>([])
watch(checked, () => {
  userTransactionStore.totalPayment = 0
  console.log('checked value = ',checked.value);
  
  userTransactionStore.cartItems.forEach(item => {
    checked.value.forEach(check => {
      if (item.id === check) {
        userTransactionStore.totalPayment += (item.price * item.quantity)
      }
    })
  })
},{ deep: true })

const increment = (item: ICart) => {
  item.quantity = item.quantity + 1;
  if ( checked.value.find((e) => {return e === item.id}) ) {
    userTransactionStore.totalPayment += item.price
  }
}
const decrement = (item: ICart) => {
  if (item.quantity > 1) {
    item.quantity = item.quantity - 1;
    if ( checked.value.find((e) => {return e === item.id}) ) {
      userTransactionStore.totalPayment -= item.price
    }
  }
}
const deleteCart = (item: ICart) => {
  const position = userTransactionStore.cartItems.indexOf(item)
  userTransactionStore.cartItems.splice(position,1)

  // delete cheked if check true before deleted
  const positionCheck = checked.value.indexOf(item.id)
  checked.value.splice(positionCheck,1)
  
}

const submit = () => {

  userTransactionStore.cartItems.forEach(item => {
      item.checked = false
    })
  checked.value.forEach(check => {
    userTransactionStore.cartItems.forEach(item => {
      if(check === item.id) {
        item.checked = true
      }
    })
  })

  const result = userTransactionStore.cartItems.filter(item => {
    return item.checked
  })

  console.log('submit = ',result);
  
}




</script>

<style scoped>
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
