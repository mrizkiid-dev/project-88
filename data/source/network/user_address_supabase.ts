// import type { TUserAddressp } from "~/types/database/user"

import type { TUserAddressp } from "~/data/types/user_address"

export const supabaseInsertUserAddress = async(body: TUserAddressp[]) => {
    const { error } = await useSupabaseClient<any>().from('user_address').insert(body)

    return { error }
}