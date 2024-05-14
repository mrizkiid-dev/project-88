<template>
    <main class="">
        <div v-if="pending">
            <p>...Loadingaaaa</p>
        </div>
        <div v-else>
            <p>sss</p>
            <p>{{ data }}</p>
        </div>
        <!-- <p>{{ result }}</p> -->
    </main>
</template>

<script setup lang="ts">
import type { TCostPost } from '~/types/api/cost-post';

const { isMobile } = useScreen()
const client = useSupabaseClient()

const isLoading = ref<boolean>(false)

onMounted(async() => {
    let body: TCostPost
    // const response = 
    //                 await $fetch('https://api.rajaongkir.com/starter/cost',{
    //                     method: 'POST',
    //                     headers : {
    //                         'content-type': 'application/x-www-form-urlencoded',
    //                         key: useRuntimeConfig().rajaOngkirApi
    //                     },
    //                     body: body
    //                 })
})

// const {data,error,pending} = useLazyAsyncData('test4', async () => {
//     isLoading.value = true
//     const { data,error } = await client.from('product').select()
//     if (error) {
//         // console.table(error);   
//         isLoading.value = false
//         throw createError({
//             statusMessage: error.message,
//             statusCode: 404,
//             message: error.message,
//         })
//     }
//     console.table(data);
//     isLoading.value = false
//     return data
// })

// const result = await client.from('product').select()
// console.log(result);

// const { data,error } = await client.from('product').select()

// if (data === null) {
//     data.value = 'ksong'
// }

// if(error) {
//     console.table(error);
// }

</script>