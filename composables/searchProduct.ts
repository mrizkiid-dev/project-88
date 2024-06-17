import type { TSearchResult } from "~/types/components/searchResult"

export const useSearchProductAppBar = () => {
    const supabaseClient = useSupabaseClient()
        // search app bar
    const searchAppBar = ref<string>('')
    watch(searchAppBar, (search) => {
        onInput(search)
    })

    const isSearchLoading = ref<boolean>(false)
    const searchResult = ref<TSearchResult[]>([])
    const setSearchResult = async (search: string | null) => {
        console.log('search --- kena == ',search);
        if (search && search !== '') {
            try {
                isSearchLoading.value = true
                const { data, error } = 
                await supabaseClient.from('product')
                    .select('id,name,price,product_image(image_url)')
                    .like('name', `%${search}%`)
                    .limit(10)
                    .returns<{
                            id: number | string,
                            name: string,
                            price: number,
                            product_image: {
                                    image_url: string
                            }[]
                    }[]>()
                
                if (data && data.length > 0) {
                    searchResult.value = []
                    data.forEach( product => {
                        const result: TSearchResult = {
                                id: product.id,
                                title: product.name,
                                price: product.price,
                                image: product.product_image[0].image_url
                        }

                        searchResult.value.push(result)
                    })
                }

                if (!data || (data && data.length < 1)) {
                    searchResult.value = []
                }

                if (error) {
                        throw JSON.stringify(error)
                }
            } catch (error) {
                    console.log('error search appbar = ',error);
            } finally {
                    isSearchLoading.value = false
            }
        } else {
            searchResult.value = []
        }
    }
    const onInput = onDebounce(setSearchResult, 500)

    const onDestroy = () => {
        isSearchLoading.value = false
        searchAppBar.value = ''
        searchResult.value = []
    }

    return {
        isSearchLoading,
        searchAppBar,
        searchResult,
        onDestroy
    }
}