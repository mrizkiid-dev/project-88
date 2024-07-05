export const useAddToCart = async(id: number | string | null | undefined, logErrorMsg?: string) => {
    const user = useSupabaseUser()
    const client = useSupabaseClient<any>()
    const isLoading = ref<boolean>(false)
    const error = ref<string>('')

    try {
        isLoading.value = true
        if(user.value && user.value.id) {
            const {data , error} = await client.from('shopping_session').select('id').eq('user_uuid',user.value.id)
            console.log('data = ',data && data.length > 0);
            
            if(data && data.length > 0 && id && isANumber(id)) {
                const { data: dataSelectProduct, error: errorSelectProduct } = await client.from('cart_item').select('id').eq('product_id', id).eq('session_id', data[0].id)
                console.log(dataSelectProduct);
                
                if (!dataSelectProduct || (dataSelectProduct && dataSelectProduct.length < 1)) {
                    const { error } = await client.from('cart_item').insert([{
                        session_id: data[0].id,
                        product_id: id,
                        qty: 1
                    }])
                    console.log('kena');
                    
                    if (error) {
                        throw JSON.stringify(error)
                    }
                }

            } else {
                navigateTo('/auth/login')
            }
            if (error) {
                throw JSON.stringify(error)
            }
        }
    } catch (err) {
        console.log(`${logErrorMsg} = `,err);
        error.value = JSON.stringify(err)
    } finally {
        isLoading.value = false
    }

    return {
        isLoading,
        error
    }
}