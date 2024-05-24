<template>
  <main class="pt-[100px] pb-[90px] px-4 flex flex-col items-center gap-10 bg-gray-v1 md:gap-20 md:px-2">
    <h1 class="px-3 py-1 bg-primary font-semibold text-2xl text-third-color inline-block tracking-wider">
      <span v-if="isMobile">Summary</span>
      <span v-else>Checkout</span>
    </h1>

    <teleport v-if="isShowModalAddress" to="#pop-up">
      <div class="fixed z-[99] w-screen h-screen bg-[#abaaaa80] cursor-pointer flex items-center justify-center" @click.self="onCloseModalAddress">
        <form class="bg-third-color rounded-xl min-w-[300px] h-[700px] flex flex-col p-5 overflow-y-scroll scroll-radius gap-3 md:min-w-[600px]" @submit.prevent="submitAddress">
          <h1 class="flex justify-center font-black tracking-wider text-2xl mb-10">Address</h1>
          <TextField title="phone number" place-holder="089xxxxxxxxx" input-type="tel" :is-mandatory="true" v-model="formAddress.telephone"/>
          <DropdownForm title="province" place-holder="Jawa Barat" :is-mandatory="true" v-model="formAddress.province"
            :is-show-drop-down="isShowDropDown.province" :choose="provinces" :loading="isProvinceLoading" @on-tap="onTapProvince" @on-tap-drop-down="onTapDropDownProvince"/>
          <DropdownForm title="City" v-model="formAddress.city" place-holder="Bandung" :is-mandatory="true" empty-warning="province should not be empty"
            :is-show-drop-down="isShowDropDown.city" :choose="cities" :loading="isCityLoading" @on-tap="onTapCity" @on-tap-drop-down="onTapDropDownCity"/>
          <TextFieldArea title="Additional Address" :is-mandatory="false" place-holder="hi ka ...." v-model="formAddress.address"/>
          <ButtonDarkMd :disable="isButtonDisable" title="SignUp" style-css="min-h-[40px] w-full"/>
        </form>
      </div>
    </teleport>

    <div class="container max-w-[1337px] flex flex-row gap-4">
      <div id="left" class="flex-grow-[9] flex flex-col gap-4">
        <div id="address"
          class="flex flex-col gap-2 px-4 py-6 bg-third-color border rounded-md shadow-[4px_4px_4px_0px_#9C9C9C40] order-2 md:order-1">
          <h2 class="text-lg font-bold tracking-wide md:text-2xl">Shipping Address</h2>
          <div>
            <button v-if="!isAddressShow"
              class="flex flex-row bg-primary items-center justify-center gap-2 text-third-color py-1 px-2 min-w-[150px] rounded-lg text-base md:text-lg"
              @click="onAddAddress">
                <Icon name="ic:round-plus" />
                <span>add address</span>
            </button>
            <button v-else
              class="flex flex-row bg-primary items-center justify-center gap-2 text-third-color py-1 px-2 min-w-[150px] rounded-lg text-base md:text-lg"
              @click="onUpdateAddress">
              <div>
                <Icon name="ic:round-plus" />
                <span>update address</span>
              </div>
            </button>
          </div>
          <div v-if="isAddressShow" class="py-5 border-t-[1px] mt-5 flex flex-col">
            <strong>Delivery Address</strong>
            <div class="flex flex-col max-w-[400px] text-sm mt-3">
              <div class="flex flex-row gap-2 items-center ">
                <p>Contact Name</p>
                <p>:</p>
                <p>{{ profileStore.name }}</p>
              </div>
              <div class="flex flex-row gap-2 items-center w-full">
                <p>Address : </p>
                <p>{{ profileStore.additionalAddress }}</p>
              </div>
              <div class="flex flex-row gap-2 items-center w-full">
                <p>City : </p>
                <p>{{ profileStore.city.name }}</p>
              </div>
              <div class="flex flex-row gap-2 w-full">
                <p>Province : </p>
                <p>{{ profileStore.province.name }}</p>
              </div>
              <div class="flex flex-row gap-2 items-center w-full">
                <p>Phone Number : </p>
                <p>{{ profileStore.phoneNumber }}</p>
              </div>
            </div>
          </div>
        </div>

        <div id="checkout"
          class="p-4 bg-third-color border rounded-md shadow-[4px_4px_4px_0px_#9C9C9C40] flex flex-col gap-5 order-1 md:order-2 md:px-8 md:py-6">
          <div id="checkout-items" v-for="product in checkoutStore.products" :key="product.id"
            class="flex flex-row items-center px-3 shadow-[4px_4px_4px_0px_#9C9C9C40] gap-2 md:p-3">
            <img :src="product.imageSrc" :width="isMobile ? `60px` : `80px`" class="rounded-md overflow-clip">
            <div class="flex flex-col p-3 text-sm md:text-xl">
              <h4 class="font-semibold">{{ product.title }}</h4>
              <p class="">{{ product.qty }} Pcs</p>
              <p>Rp. {{ numberTocurrency(product.price * product.qty) }}</p>
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
              <strong>Rp {{ numberTocurrency(checkoutStore.subTotal) }}</strong>
            </div>
            <!-- <div class="flex justify-between">
              <p>Discount</p>
              <strong>- Rp {{ discount }}</strong>
            </div> -->
            <div v-if="checkoutStore.shipping.price && checkoutStore.shipping.price > 0" class="flex flex-row justify-between">
              <p>Shipping</p>
              <div class="flex flex-col items-end">
                <strong>Rp {{ numberTocurrency(checkoutStore.shipping.price) }}</strong>
                <!-- <p class="text-sm">( {{ checkoutStore.shipping.estimate }} day )</p> -->
              </div>
            </div>
          </div>

          <div class="border my-2" />

          <div class="py-2 flex flex-row font-bold text-xl justify-between">
            <p>Total</p>
            <p>Rp {{ numberTocurrency(checkoutStore.totalPayment) }}</p>
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
  layout: 'checkout',
  middleware: 'checkout'
})

// const { $script } = useScript({
//   src: 'https://app.sandbox.midtrans.com/snap/snap.js',
//   async: true,
//   "data-client-key": useRuntimeConfig().midtransClientKey,
// })

import { useUserCheckout } from '~/stores/checkout';
import type { IChoose, ICity } from '~/types/components/dropdownForm'
import type { ISignUpForm } from '~/types/pages/auth'
import type { ITextfieldError } from '~/types/components/textfield';
import type { responseCities, responseProvince } from '~/types/response/responseShipping';
import type { TAddress } from '~/types/components/address'
import type { TSnapCreateTransaction, TMidItemDetails, TMidCustomer } from '~/types/midtrans/midtrans-api';

const { isMobile } = useScreen()
const checkoutStore = useUserCheckout()
const profileStore = useProfileStore()
const supabaseClient = useSupabaseClient<any>()

onMounted(async () => {
  await initCheckout()
})


const isShowModalAddress = ref<boolean>(false)
const onAddAddress = () => {
  revertBoolean(isShowModalAddress)
}

const onUpdateAddress = () => {
  revertBoolean(isShowModalAddress)
}
const onCloseModalAddress = () => {
  isShowModalAddress.value = false
  onDestroyModalAddress()
}


const isAddressShow = computed(() => {
  return profileStore.isAdressNotEmpty
})

const totalPayments = ref<number>(99989000)

const formAddress = reactive<TAddress>({
  telephone: '',
  province: null,
  city : null,
  address : '',
})

//province
const isProvinceLoading = ref<boolean>(false)
const provinces = ref<IChoose[]>([])
const onTapProvince = async () => {
    if (provinces.value.length === 0) {
        isProvinceLoading.value = true
        formAddress.city = null
        try {
            const response: responseProvince =  await $fetch('/api/shipping/province',{
                onResponseError({request, response, options}) {
                    if (response.status === 400) {
                        throw response._data
                    }
                    if (response.status === 500) {
                        throw response._data
                    }
                },
                server: false
            })
            response.data.forEach(province => {
                provinces.value.push({
                    id: province.province_id,
                    name: province.province
                })
            });  
            provinces.value.sort(
                (a,b) => {
                let aName = a.name.toLowerCase()
                let bName = b.name.toLowerCase()

                if (aName < bName) {
                    return -1
                }
                if (aName > bName) {
                    return 1
                }
                return 0
                }
            )
        } catch (error) {
            console.log(error);
        } finally {
            isProvinceLoading.value = false
        }
    }
    dropDownProvince()
}

// City
const isCityLoading = ref<boolean>(false)
const cities = ref<ICity[]>([])
watch(() => formAddress.province, async () => {
    formAddress.city = null
    cities.value = []
    if (formAddress.province) {
        isCityLoading.value = true
        try {
            const response: responseCities =  await $fetch('/api/shipping/city',{
                query: {
                    province: formAddress.province.id
                },
                onResponseError({request, response, options}) {
                    if (response.status === 400) {
                        throw response._data
                    }
                    if (response.status === 500) {
                        throw response._data
                    }
                },
                server: false
            })
            response.data.forEach(city => {
                cities.value.push({
                    id: city.city_id,
                    name: city.type + ' ' + city.city_name,
                    postal_code: city.postal_code
                })
            });  
            cities.value.sort(
                (a,b) => {
                let aName = a.name.toLowerCase()
                let bName = b.name.toLowerCase()

                if (aName < bName) {
                    return -1
                }
                if (aName > bName) {
                    return 1
                }
                return 0
                }
            )
        } catch (error) {
            console.log(error);
        } finally {
            isCityLoading.value = false
        }
    }
})

//DropDown Logic
const isShowDropDown = reactive({
    province: false,
    city: false,
})

const onTapDropDownProvince = () => {
    isShowDropDown.province = false
}
const onTapDropDownCity = () => {
    isShowDropDown.city = false
}

const dropDownProvince = () => {
    isShowDropDown.province = !isShowDropDown.province
    isShowDropDown.city = false
}
const onTapCity = () => {
    isShowDropDown.province = false
    isShowDropDown.city = !isShowDropDown.city
}

const isButtonDisable = computed<boolean>(() => {
    if (
      formAddress.telephone && formAddress.telephone !== '' &&
      formAddress.province && formAddress.province.id && formAddress.province.name !== '' &&
      formAddress.city && formAddress.city.id && formAddress.city.name !== '' &&
      formAddress.address && formAddress.address !== ''
    ) {
        return false
    }
    return true
})

const initCheckout = async() => {
  let totalWeight: number = 0
  checkoutStore.products.forEach(product => {
    totalWeight += product.weight
  })
  
  if(totalWeight > 0) {
    checkoutStore.totalWeight = totalWeight
  }

  if(profileStore.city.id !== null && profileStore.city.id !== undefined) {
    await checkoutStore.initShipping(profileStore.city.id)
  }

  checkoutStore.totalPayment = checkoutStore.subTotal + (checkoutStore.shipping.price ?? 0)
}

const submitAddress = async () => {
  console.log('aaa = ' ,profileStore.uuid)
  try {
    const {data, error } = await supabaseClient.from('user_address').select('id').eq('user_uuid', profileStore.uuid).limit(1)
    if (data && data.length > 0 && data[0].id) {
      console.log('id = ',data[0].id);
      
      const { error } = await supabaseClient
      .from('user_address')
      .update(
        { 
          whatsapp_number: formAddress.telephone,
          province_id: formAddress.province?.id,
          province: formAddress.province?.name,
          city_id: formAddress.city?.id,
          city: formAddress.city?.name,
          postal_code: formAddress.city?.postal_code,
          additional_address: formAddress.address
        }
      ).eq('id',data[0].id)

      if (error) {
        throw JSON.stringify(error)
      }
    } else {
      const { error } = await supabaseClient
      .from('user_address')
      .insert(
        { 
          whatsapp_number: formAddress.telephone,
          province_id: formAddress.province?.id,
          province: formAddress.province?.name,
          city_id: formAddress.city?.id,
          city: formAddress.city?.name,
          postal_code: formAddress.city?.postal_code,
          additional_address: formAddress.address
        }
      )

      if (error) {
        throw JSON.stringify(error)
      }
    }

    if (error) {
      throw JSON.stringify(error)
    }
  } catch (error) {
    console.log('submit address - checkout = ',error)
  }

  await profileStore.initAddress()
  await initCheckout()

  onCloseModalAddress()
}

const onDestroyModalAddress =() => {
    formAddress.telephone = ''
    formAddress.province = null
    formAddress.city = null
    formAddress.address = ''
}

const submit = async() => {
    try {
      const { data, error } = await supabaseClient.from('order').insert([
        {
          shopping_session_id: profileStore.sessionId,
          name_receiver: profileStore.name,
          detail_address: profileStore.additionalAddress,
          city_id: profileStore.city.id,
          city: profileStore.city.name,
          province_id: profileStore.province.id,
          province: profileStore.province.name,
        }
      ]).select('id').limit(1)

      if (error) {
        throw JSON.stringify(error)
      }
      
      if (data !== null && isNonEmptyArray(data)) {
        const orderItemBody = checkoutStore.products.map((product) => {
          return {
            order_id: data[0].id,
            product_id: product.id,
            quantity: product.qty
          }
        })

        const { error } = await supabaseClient.from('order_item').insert(orderItemBody)
        if (error) {
          throw JSON.stringify(error)
        }

        const itemDetails = checkoutStore.products.map<TMidItemDetails>((product) => {
          return {
              id: product.id.toString(),
              name: product.title,
              price: product.price,
              quantity: product.qty,
            }
        })

        itemDetails.push({
          id: 'POS-IND',
          name: 'POST INDONESIA Shipping',
          price: checkoutStore.shipping.price,
          quantity: 1
        })

        const {firstName, lastName } = spliceName(profileStore.name)
        const customer_detail = <TMidCustomer>{
          first_name: firstName,
          last_name: lastName,
          email: profileStore.email,
          phone: profileStore.phoneNumber,
          shipping_address: {
            first_name: firstName,
            last_name: lastName,
            address: profileStore.additionalAddress,
            city: profileStore.city.name,
            email: profileStore.email,
            phone: profileStore.phoneNumber,
            country_code: "IDN"
          }
        }

        const response = await $fetch('/api/shipping/midtrans-token',{
          method: 'POST',
          body: <TSnapCreateTransaction>{
            id: 'TEST'+ Math.floor(Math.random()*100) + data[0].id,
            product: itemDetails,
            customer_detail: customer_detail,
            gross_amount: checkoutStore.totalPayment
          }
        })

        if (response && typeof response === 'object' && 'token' in response && typeof response.token === 'string'){
          const { error } = await supabaseClient.from('order').update({
            midtrans_token: response.token
          }).eq('id', data[0].id)

          if ( error ) {
            throw JSON.stringify(error)
          }
          // window.snap.pay(response.token)
        }
      }
    } catch (error) {
      console.log('ERROR! sumbit pay = ',error);
    }
}

</script>