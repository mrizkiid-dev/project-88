import type { IDatabase } from "~/types/database/supabase"

export const supabaseGetProfileDetail = async(uuid: string) => {
    const { data, error } = await useSupabaseClient<any>().from('user').select('name,email,user_address(whatsapp_number, province_id, province, city_id, city, district, additional_address)').eq('uuid', uuid)
    return { data, error }
}

export const supabaseGetInitProfile = async(uuid: string | undefined) => {
    const { data , error } = await useSupabaseClient<IDatabase>().from('user')
        .select(`uuid,name,email,shopping_session(id,sub_total,total_payment),user_address(whatsapp_number,province_id,province,city_id,city,district,additional_address)`)
        .eq('uuid',uuid).limit(1)

    return { data, error }
}