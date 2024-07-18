import { supabaseGetBestSeller, supabaseGetCountProductsBySearch, supabaseGetCountProductsRow, supabaseGetProductBySearch, supabaseGetProductDetail, supabaseGetProductSearchSuggest, supabaseGetProducts, supabaseGetProductsRow } from "../source/network/product_supbase"
import type { TParamsGetProductByRow, TParamsGetProductSearch, TParamsGetProducts } from "../types/params"

export const getBestSeller = async() => {
    const { data, error } = await supabaseGetBestSeller()
    return { data, error }
}

export const getProducts = async(params: TParamsGetProducts) => {
    const { data , error } = await supabaseGetProducts(params)
    return { data, error}
}

export const getProductDetail = async(orderId: string | string[]) => {
    const { data, error } = await supabaseGetProductDetail(orderId)
    return { data, error }
}

export const getProductSearch = async(params: Prettify<TParamsGetProductSearch>) => {
    const { data, error } = await supabaseGetProductBySearch(params)
    return { data, error }
}

export const getProductsRow = async(params: TParamsGetProductByRow) => {
    const { data, error } = await supabaseGetProductsRow(params)
    return { data, error }
}

export const getCountProductsBySearch = async(keyword: string) => {
    const { count, error } = await supabaseGetCountProductsBySearch(keyword)
    return { count, error }
}

export const getCountProductsRow = async() => {
    const { count, error } = await supabaseGetCountProductsRow()
    return { count , error }
}

export const getProductSearchSuggest = async(search: string) => {
    const { data, error } = await supabaseGetProductSearchSuggest(search)
    return { data, error}
}