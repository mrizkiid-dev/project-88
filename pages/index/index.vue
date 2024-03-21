<template>
    <div class="">
        <div v-if="pending">
            <p>...Loading</p>
        </div>
        <div v-else>
            <p>sss</p>
            <p>{{ data }}</p>
        </div>
    </div>
</template>

<script setup>
const { isMobile } = useScreen()
const client = useSupabaseClient()

const { data, error, pending } = await useAsyncData('test2', async () => {
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