<template>
  <!-- <HomePage> -->
  <!-- <NuxtErrorBoundary @error=logError> -->
  <main v-if="isMobile">
    <section v-if="profileStore.isLoading">
      <Loading />
    </section>
    <section v-else-if="profileStore.cart.length > 0 && !profileStore.isLoading" class="pt-[60px]">
      <div class="flex flex-row items-center gap-3 pl-4 w-full h-[40px] border-b-[1px] fixed z-50 bg-third-color">
        <input type="checkbox" id="all-check" v-model="isAllCheck" class="checked:bg-primary">
        <label for="all-check"> Select all products </label>
      </div>
      <form @submit.prevent class="py-[80px] px-4">
        <ol class="flex flex-col gap-4">
          <CartCard v-for="cart in profileStore.cart"
            :id="cart.id"
            :image-src="cart.imageSrc"
            :title="cart.title"
            :price="cart.price*cart.quantity"
            :quantity="cart.quantity"
            v-model:checked="checked"
            @increase="increment(cart)"
            @decrease="decrement(cart)"
            @delete-cart="deleteCart(cart)"
            @click="onTapChecBox(cart)"
            :key="cart.id"
          />
        </ol>
        <BottomNavTransaction title="Total Payment" :total-payment="profileStore.totalPayment" title-button="checkout" @on-tap="submit"/>
      </form>
    </section>

    <section v-else class="h-screen flex flex-col items-center justify-center gap-6">
      <NuxtImg src="/img/empty-cart.svg" width="188px" height="289px" class="mt-14"/>
      <h2 class="font-Inconsolata tracking-[0.3em] font-black text-2xl">EMPTY</h2>
    </section>
  </main>

  <main v-else >
    <teleport v-if="profileStore.isLoading" to="#pop-up">
      <Loading />
    </teleport>
    <section v-else-if="profileStore.cart.length > 0 && !profileStore.isLoading" class="pt-[100px] pb-[60px] flex flex-col items-center gap-20 bg-gray-v1">
      <h1 class="px-2 py-1 bg-primary font-semibold text-xl text-third-color inline-block">Cart</h1>
      <div class="container max-w-[1337px] flex flex-row gap-4">
        <div id="left" class="flex-grow-[9] px-4 py-6 bg-third-color border flex flex-col rounded-md shadow-[4px_4px_4px_0px_#9C9C9C40]">
          <div class="flex flex-row justify-between">
            <h2 class="text-2xl font-semibold">Shopping Cart ({{ profileStore.cart.length }})</h2>
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
          <div v-for="cart in profileStore.cart" :key="cart.id" class="flex flex-row gap-2">
            <input type="checkbox" :value="cart.id" v-model="checked" @click="onTapChecBox(cart)"/>
            <div class="flex flex-row w-full p-2 border mt-2 font-semibold">
              <div id="product-details" class="flex flex-row flex-grow-[4] max-w-[650px] items-center gap-2">
                <img src="/img/products/product-example-1.png" width="60px" height="60px" class="rounded-md"/>
                <h3>{{ cart.title }}</h3>
              </div>
              <div id="quantity" class="flex-grow-[1] max-w-[120px] flex-row flex-center gap-2">
                <strong @click="decrement(cart)" class="text-xl cursor-pointer select-none">-</strong>
                <div class="p-3 w-[40px] h-[40px] border-2 border-primary flex justify-center items-center">{{ cart.quantity }}</div>
                <strong @click="increment(cart)" class="text-xl cursor-pointer select-none">+</strong>
              </div>
              <div id="price" class="flex-grow-[1] max-w-[120px] flex-center">
                <p>Rp. {{ numberTocurrency(cart.price) }}</p>
              </div>
              <div id="total" class="flex-grow-[1] max-w-[120px] flex-center">
                <p class="text-ellipsis inline-block whitespace-nowrap">Rp. {{numberTocurrency (cart.price * cart.quantity) }}</p>
              </div>
              <div class="flex-grow-[1] flex max-w-5 items-center justify-center cursor-pointer" @click="deleteCart(cart)">
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
              <strong>Rp. {{ numberTocurrency(profileStore.subTotal) }}</strong>
            </div>
            <div class="border my-2" />
            <div class="text-xl flex justify-between">
              <strong>Total</strong>
              <strong>Rp. {{ numberTocurrency(profileStore.totalPayment) }}</strong>
            </div>
          </div>
          <!-- <div class="flex justify-center mt-[150px]">
            <ButtonBgYellow title="checkout" sytle-css="px-12 py-1" @on-tap="submit"/>
          </div> -->
          <div class="absolute bottom-0 flex justify-center w-full -ml-4 pb-3 px-4">
            <ButtonBgYellow title="Checkout" sytle-css=" w-full py-1 " @on-tap="submit" :disabled="isCheckoutBtnDisable"/>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="h-screen flex flex-col items-center justify-center gap-8">
      <NuxtImg src="/img/empty-cart.svg" width="458px" height="549px" />
      <h2 class="font-Inconsolata tracking-[0.3em] font-black text-6xl">EMPTY</h2>
    </section>
  </main>
  <!-- </NuxtErrorBoundary> -->
  <!-- </HomePage> -->
</template>

<script setup lang="ts">
import type { ICart } from '~/types/pages/cart';
import type { TCheckout } from '~/types/checkout';
import { useUserCheckout } from '~/stores/checkout';
import HomePage from '~/layouts/home-page.vue';

definePageMeta({
  layout: 'cart',
  middleware: 'auth'
});

const checkoutStore = useUserCheckout()

onMounted(async () => {
  profileStore.isLoading = true
  if (!profileStore.uuid) {
    await profileStore.initProfile()
  } else {
    await profileStore.initCart()
  }
  profileStore.isLoading = false
})

const { isMobile } = useScreen()

const profileStore = useProfileStore()

const isAllCheck = ref<boolean>(false)
const checked = ref<number[]>([])
watch(isAllCheck, () => {
  profileStore.subTotal = 0
  if(isAllCheck.value) {
    profileStore.cart.forEach((item) => {
      if(item.quantity > 0) {
        checked.value.push(item.id)
        item.checked = true
        profileStore.subTotal += (item.price * item.quantity) 
      } 
    })
  } else {
    profileStore.cart.forEach((item) => {
      item.checked = false
    })
    checked.value = []
  }
  profileStore.totalPayment = profileStore.subTotal
})

watch(checked, () => {
  profileStore.subTotal = 0
  console.log('checked value = ',checked.value);
  
  profileStore.cart.forEach(item => {
    checked.value.forEach(check => {
      if (item.id === check) {
        profileStore.subTotal += (item.price * item.quantity)
      }
    })
  })

  profileStore.totalPayment = profileStore.subTotal
},{ deep: true })
const onTapChecBox = (cart: ICart) => {
  cart.checked = !cart.checked
}

const increment = (item: ICart) => {
  item.quantity = item.quantity + 1;
  if ( checked.value.find((e) => {return e === item.id}) ) {
    profileStore.subTotal += item.price
    profileStore.totalPayment = profileStore.subTotal
  }
}
const decrement = (item: ICart) => {
  if (item.quantity > 1) {
    item.quantity = item.quantity - 1;
    if ( checked.value.find((e) => {return e === item.id}) ) {
      profileStore.subTotal -= item.price
      profileStore.totalPayment = profileStore.subTotal
    }
  }
}
const deleteCart = async (item: ICart) => {
  const position = profileStore.cart.indexOf(item)
  profileStore.cart.splice(position,1)

  // delete cheked if check true before deleted
  if (item.cartId) {
    const positionCheck = checked.value.indexOf(item.cartId)
    checked.value.splice(positionCheck,1)

    const { error } = await useSupabaseClient()
    .from('cart_item')
    .delete()
    .eq('id', item.cartId)

    console.log('error cart= ',error);
  }
  
}

const isCheckoutBtnDisable = computed(() => {
  return checked.value.length < 1
})

const submit = () => {
  const result = profileStore.cart.filter(item => {
    return item.checked
  })

  checkoutStore.products = []
  checkoutStore.subTotal = profileStore.subTotal
  checkoutStore.totalPayment = profileStore.totalPayment
  let checkoutItem : TCheckout
  result.forEach(cart => {
    checkoutItem = {} as TCheckout
    checkoutItem.cartId = cart.cartId
    checkoutItem.id = cart.id
    checkoutItem.title = cart.title
    checkoutItem.imageSrc = cart.imageSrc
    checkoutItem.qty = cart.quantity
    checkoutItem.price = cart.price
    checkoutItem.weight = cart.quantity * cart.productWeight
    checkoutStore.products.push(checkoutItem)
  })

  navigateTo('/checkout')
  
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
