// import type { TUserAddressp } from "~/types/database/user"

import type { TUserAddressp } from "~/data/types/user_address"

export const supabaseInsertUserAddress = async(body: TUserAddressp[]) => {
    const { error } = await useSupabaseClient<any>().from('user_address').insert(body)

    return { error }
}

export const supabaseGetUserAddress = async(uuid: string) => {
    const {data, error } = await useSupabaseClient<any>().from('user_address').select('id').eq('user_uuid', uuid)
    return { data, error }
}

export const supabaseUpdateUserAddress = async(id: string | number, body: TUserAddressp) => {
    const { error } = await useSupabaseClient<any>()
      .from('user_address')
      .update(body)
      .eq('id',id)

    return { error }
}

export const supabaseGetInitAddress = async(uuid: string | undefined) => {
    const {data, error} = await useSupabaseClient<any>().from('user_address')
                        .select('whatsapp_number,province,province_id,city,city_id,district,additional_address').eq('user_uuid',uuid).limit(1)

    return { data, error }
}