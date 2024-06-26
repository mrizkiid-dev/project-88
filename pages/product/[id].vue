<template>
    <main class="h-svh" v-if="isLoading">
        <Loading />
    </main>
    <main v-else id="product-detail" class="flex justify-center items-center pt-10 pb-14 md:bg-gray-v1 md:pt-24">
        <div class="
                container bg-third-color rounded-3xl flex flex-col p-5 py-14 gap-10
                md:border md:gap-4 
                lg:flex-row lg:justify-start lg:items-start
                xl:max-w-[1200px]
            ">

            <div id="left" class="basis-full flex flex-col items-center justify-center gap-3 border-2 border-primary rounded-2xl md:border-none overflow-clip">
                <img :src="displayImage" alt="" class="w-full rounded-xl md:max-w-[560px]">
                <div class="flex flex-row flex-wrap gap-3 p-3">
                    <img v-for="image in images" :key="image.id" :src="image.imageSrc" alt="" 
                        class="max-w-[55px] rounded-[10px] border overflow-clip cursor-pointer md:border-none md:max-w-[69px]" 
                        :class="[{'opacity-100': image.isChoose}, {'opacity-50': !image.isChoose}]"
                        @click=setDisplayImage(image)
                    >
                </div>
            </div>

            <div id="right" class="basis-full flex flex-col items-stretch justify-between gap-20 lg:gap-12">
                <div class="flex flex-col gap-5 h-full">
                    <h2 id="title" class="font-extrabold font-Inconsolata text-xl md:text-2xl">{{ title }}</h2>
                    <p id="description" class="text-base md:text-lg">{{ description }}</p>
                    <div class="w-full">
                        <span class="font-black text-third-color inline-block text-lg px-3 py-2 bg-primary md:text-xl">Rp. {{ price }}</span>
                        <br>
                        <p class="mt-3 font-black text-primary border border-primary inline-block text-sm px-2 py-1 bg-third-color md:text-base">{{ qty }} pcs</p>
                    </div>
                </div>
                <ButtonBgYellow sytle-css="w-full mx-auto md:w-[500px] border-2 border-primary" @on-tap="submit">
                    <div class="flex flex-row justify-center items-center py-3 text-2xl gap-2">
                        <span class="font-bold tracking-wider text-lg md:text-xl">add to cart</span>
                        <Icon name="uil:cart" size="30px"/>
                    </div>
                </ButtonBgYellow>
            </div>

        </div>
    </main>
</template>

<script setup lang="ts">
import type { ICatalogue } from '~/types/database/product';


definePageMeta({
    layout: 'product-detail'
})
const route = useRoute()

type TImage = {
    id: number | string
    imageSrc: string
    isChoose: boolean
}

const client = useSupabaseClient<any>()
const user = useSupabaseUser()

//detail product
const title = ref<string>('')
const description = ref<string>('')
const price = ref<string>('')
const qty = ref<number>(0)
const product = ref<ICatalogue[]>([])

onMounted(() => {
    if(data.value !== null) {
        data.value[0].product_image.forEach(img => {
            images.value.push({
                    id: img.id,
                    imageSrc: img.image_url,
                    isChoose: false
            })
        });
        images.value[0].isChoose = true
        title.value = data.value[0].name
        description.value = data.value[0].desc
        price.value = data.value[0].price
        qty.value = data.value[0].qty
    }
})

const { data, pending, error, status, refresh } = useLazyAsyncData('product-detail0626', async () => {
    const { data,error } = await client.from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).eq(`id`,route.params.id).limit(1).returns<ICatalogue[]>()
    if (error) {
        console.log('error = ',JSON.stringify(error))  
        throw JSON.stringify(error)
    }
    return data
},)


if(error.value) {
    console.log('error = ',error);
}

const images = ref<TImage[]>([])
watch(status, () => {
    images.value = []
    if (status.value === 'success' && data && data.value) {
        data.value[0].product_image.forEach(img => {
            images.value.push({
                    id: img.id,
                    imageSrc: img.image_url,
                    isChoose: false
            })
        });
        images.value[0].isChoose = true
        title.value = data.value[0].name
        description.value = data.value[0].desc
        price.value = data.value[0].price
        qty.value = data.value[0].qty
    }
})

const displayImage = computed(() => {
    let image = images.value.find(image => image.isChoose)
    return image?.imageSrc
})

const setDisplayImage = (image: TImage) => {
    let imageResult = images.value.find(image => image.isChoose)
    if (imageResult != undefined) {
        imageResult.isChoose = false
    }
    image.isChoose = !image.isChoose
}

const isLoading = ref<boolean>(false)
const submit = async () => {
    try {
        isLoading.value = true
        if(user.value && user.value.id) {
            let errorCart: boolean = false
            const {data , error} = await client.from('shopping_session').select('id').eq('user_uuid',user.value.id)
            
            if(data && data.length > 0) {
                const { data: dataSelectProduct, error: errorSelectProduct } = await client.from('cart_item').select('id').eq('product_id', route.params.id).eq('session_id', data[0].id)
                console.log(dataSelectProduct);
                
                if (!dataSelectProduct || (dataSelectProduct && dataSelectProduct.length < 1)) {
                    const { error } = await client.from('cart_item').insert([{
                        session_id: data[0].id,
                        product_id: route.params.id,
                        qty: 1
                    }])
                    
                    if (error) {
                        throw JSON.stringify(error)
                    }
                }

                if(errorSelectProduct) {
                    throw JSON.stringify(errorSelectProduct)
                } else {
                    isLoading.value = false
                    navigateTo('/cart')
                }

            } else {
                isLoading.value = false
                navigateTo('/auth/login')
            }

            if (error) {
                throw JSON.stringify(error)
            }
        } else {
            isLoading.value = false
            navigateTo('/auth/login')
        }
    } catch (error) {
        console.log('ERROR! submit product detail = ',error);
    } finally {
        isLoading.value = false
    }
}

</script>
