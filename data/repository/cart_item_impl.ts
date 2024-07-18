import { supabaseDeleteCartItem, supabaseGetCartItemProductDetail, supabaseGetCartItemProducts, supabaseInsertCartItem } from "../source/network/cart_item_supabase"
import type { TInsertCartItem } from "../types/cart_item"

export const getCartItemProductDetail = async(cartId: string | string[], sessionId: string | number) => {
    const { data, error } = await supabaseGetCartItemProductDetail(cartId, sessionId)
    return { data, error }
}

export const getInsertCartItem = async(body: Prettify<TInsertCartItem>[]) => {
    const { error } = await supabaseInsertCartItem(body)
    return { error }
}

export const getCartItemProduts = async(sessionId: string) => {
    const { data, error } = await supabaseGetCartItemProducts(sessionId)
    return { data, error }
}

export const deleteCartItem = async(id: string | number) => {
    const { error } = await supabaseDeleteCartItem(id)
    return { error }
}