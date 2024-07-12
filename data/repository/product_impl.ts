import { supabaseGetBestSeller, supabaseGetProducts } from "../source/network/product_supbase"
import type { TParamsGetProducts } from "../types/params"

export const getBestSeller = async() => {
    const { data, error } = await supabaseGetBestSeller()
    return { data, error }
}

export const getProducts = async(params: TParamsGetProducts) => {
    const { data , error } = await supabaseGetProducts(params)
    return { data, error}
}