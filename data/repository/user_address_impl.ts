import { supabaseGetUserAddress, supabaseInsertUserAddress, supabaseUpdateUserAddress } from "../source/network/user_address_supabase"
import type { TUserAddressp } from "../types/user_address"

export const insertUserAddress = async(body: Prettify<TUserAddressp>[]) => {
    const { error } = await supabaseInsertUserAddress(body)
    return { error }
}

export const getUserAddress = async(uuid: string) => {
    const { data, error } = await supabaseGetUserAddress(uuid)
    return { data, error}
}

export const updateUserAddress = async(id: string | number, body: Prettify<TUserAddressp>) => {
    const { error } = await supabaseUpdateUserAddress(id, body)
    return { error}
}