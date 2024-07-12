import { supabaseGetCartProducts, supabaseInsertCart } from "../source/network/cart_supabase"
import type { TCartInsert } from "../types/cart"
import type { TuserId } from "../types/params"

export const getCartProducts = async(id: TuserId, shopping_session_id: TuserId) => {
    const { data, error } = await supabaseGetCartProducts(id, shopping_session_id)

    return { data, error }
}

export const inserCart = async(body: TCartInsert[]) => {
    const { error } = await supabaseInsertCart(body)

    return { error }
}