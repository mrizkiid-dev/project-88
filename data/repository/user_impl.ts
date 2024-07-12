import { supabaseGetUserCountById, supabaseInsertUser } from "../source/network/user_supabase"
import type { TBodyInsertUser } from "../types/user"
import type { TuserId } from "../types/params"

export const getUserCountById = async(id: TuserId) => {
    const { count, error } = await supabaseGetUserCountById(id)
    return { count, error }
}

export const insertUser = async(body: Prettify<TBodyInsertUser>[]) => {
    const { error } = await supabaseInsertUser(body)
    return { error }
}