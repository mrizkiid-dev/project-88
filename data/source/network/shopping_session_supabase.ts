import type { TInsertShoppingSession } from "~/data/types/shopping_sessiont"
import type { TuserId } from "~/data/types/params"

// const client = useSupabaseClient<any>()

export const supabaseGetCountShoppingSessionById = async(id: TuserId) => {
    const { count, error } = await useSupabaseClient<any>()
        .from('shopping_session')
        .select('*', { count: 'exact', head: true })
        .eq('user_uuid', id )
    return { count, error }
}

export const supabaseGetShoppingSessionById = async(id: TuserId) => {
    const { data, error } = await useSupabaseClient<any>().from('shopping_session').select('id').eq('user_uuid',id)
    return { data, error }
}

export const supabaseInsertShoppingSession = async(body: TInsertShoppingSession[]) => {
    const { error } = await useSupabaseClient<any>().from('shopping_session').insert(body)

    return { error }
}