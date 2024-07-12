import type { TParamsGetProducts } from "~/data/types/params"
import type { ICatalogue } from "~/types/database/product"

export const supabaseGetBestSeller = async() => {
    const { data,error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).limit(7).returns<ICatalogue[]>()
    return { data, error }
}

export const supabaseGetProducts = async(params: TParamsGetProducts) => {
    const { data,error } = await useSupabaseClient<any>().from('product').select(`*,product_image(id,image_url)`).order('sell_out',{ ascending: false }).range(8, 19).returns<ICatalogue[]>()
    return { data, error }
}