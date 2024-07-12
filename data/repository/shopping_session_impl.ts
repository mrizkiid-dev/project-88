import { supabaseGetCountShoppingSessionById, supabaseGetShoppingSessionById, supabaseInsertShoppingSession } from "../source/network/shopping_session_supabase"
import type { TInsertShoppingSession } from "../types/shopping_sessiont"
import type { TuserId } from "../types/params"

export const getCountShoppingSessionById = async(id: TuserId) => {
    const { count , error } = await supabaseGetCountShoppingSessionById(id)
    return { count, error }
}

export const getShoppingSessionById = async(id: TuserId) => {
    const { data , error } = await supabaseGetShoppingSessionById(id)
    return { data, error }
}

export const insertShoppingSession = async(body: Prettify<TInsertShoppingSession>[]) => {
    const { error } = await supabaseInsertShoppingSession(body)
    return { error }
}