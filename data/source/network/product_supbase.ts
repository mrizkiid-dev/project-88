import type { TParamsGetProductByRow, TParamsGetProductSearch, TParamsGetProducts } from "~/data/types/params"
import type { ICatalogue } from "~/types/database/product"

export const supabaseGetBestSeller = async() => {
    const { data,error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).limit(7).returns<ICatalogue[]>()
    return { data, error }
}

export const supabaseGetProducts = async(params: TParamsGetProducts) => {
    const { data,error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).range(8, 19).returns<ICatalogue[]>()
    return { data, error }
}

export const supabaseGetProductDetail = async(productId: string | string[]) => {
    const { data,error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).eq(`id`,productId).limit(1).returns<ICatalogue[]>()
    return { data, error}
}

export const supabaseGetProductBySearch = async(params: TParamsGetProductSearch) => {
    const { data,error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`).ilike('name', `%${params.keyword}%`).order('sell_out',{ ascending: params.isAscending }).range(params.start, params.offset).returns<ICatalogue[]>()
    return { data, error }
}
export const supabaseGetProductsRow = async(params: TParamsGetProductByRow) => {
    const { data, error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: params.isAscending }).range(params.start, params.offset).returns<ICatalogue[]>()
    return { data, error }
}

export const supabaseGetCountProductsBySearch = async(keyword: string) => {
    const { count, error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`, { count: 'exact', head: true }).ilike('name', `%${keyword}%`)
    return { count, error }
}

export const supabaseGetCountProductsRow = async() => {
    const { count, error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`, { count: 'exact', head: true })
    return { count, error }
}

export const supabaseGetProductSearchSuggest = async(search: string) => {
    const { data, error } = await useSupabaseClient<any>().from('product')
                .select('id,name,price,product_image(image_url)')
                .ilike('name', `%${search}%`)
                .limit(10)
                .returns<{
                        id: number | string,
                        name: string,
                        price: number,
                        product_image: {
                                image_url: string
                        }[]
                }[]>()

    return { data, error }
}