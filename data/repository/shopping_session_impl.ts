import { supabaseGetCountShoppingSessionById, supabaseInsertShoppingSession } from "../source/network/shopping_session_supabase"
import type { TInsertShoppingSession } from "../types/shopping_sessiont"
import type { TuserId } from "../types/params"

export const getShoppingSessionById = async(id: TuserId) => {
    const { count , error } = await supabaseGetCountShoppingSessionById(id)
    return { count, error }
}

export const insertShoppingSession = async(body: TInsertShoppingSession) => {
    const { error } = await supabaseInsertShoppingSession(body)
    return { error }
}