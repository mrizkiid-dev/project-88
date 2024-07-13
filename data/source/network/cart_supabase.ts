import type { TCartInsert } from "~/data/types/cart"
import type { TuserId } from "~/data/types/params"

export const supabaseGetCartProducts = async (id: TuserId, shopping_session_id: TuserId) => {
    const { data, error } = await useSupabaseClient<any>().from('cart_item').select('id').eq('product_id', id).eq('session_id', shopping_session_id)
    return { data, error }
}

export const supabaseInsertCart = async(body: TCartInsert[]) => {
    const { error } = await useSupabaseClient<any>().from('cart_item').insert(body)
    return { error }
}

export const supabaseDeleteCart = async(id: number | string) => {
    const { error } = await useSupabaseClient<any>()
        .from('cart_item')
        .delete()
        .eq('id', id)
    return { error }
}