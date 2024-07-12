import { supabaseInsertUserAddress } from "../source/network/user_address_supabase"
import type { TUserAddressp } from "../types/user_address"

export const insertUserAddress = async(body: Prettify<TUserAddressp>[]) => {
    const { error } = await supabaseInsertUserAddress(body)
    return { error }
}