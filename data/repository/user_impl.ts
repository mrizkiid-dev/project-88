import { supabaseGetUserCountById, supabaseInsertUser } from "../source/network/user_supabase"
import type { TBodyInsertUser, TuserId } from "../types/user"

export const getUserCountById = async(id: TuserId) => {
    const { count, error } = await supabaseGetUserCountById(id)
    return { count, error }
}

export const insertUser = async(body: TBodyInsertUser) => {
    const { error } = await supabaseInsertUser(body)
    return { error }
}