<template>
    <main class="">
        <div v-if="pending">
            <p>...Loadingaaaa</p>
        </div>
        <div v-else>
            <p>sss</p>
            <p>{{ data }}</p>
        </div>
    </main>
</template>

<script setup>
const { isMobile } = useScreen()
const client = useSupabaseClient()

const { data, error, pending } = await useAsyncData('test3', async () => {
    const { data,error } = await client.from('product').select()
    if (error) {
        console.log('aaa',error);   
        throw createError({
            statusMessage: error.message,
            statusCode: 404,
            message: error.message,
        })
    }
    return data
}, {
    lazy: true
})

if(error.value) {
    console.log('error is called = ',error);
    throw showError({
            statusCode: error.value.code,
            message: error.value.message,
            statusMessage: error.value.statusMessage
        })
}

</script>