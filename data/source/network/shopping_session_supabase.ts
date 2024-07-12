import type { TInsertShoppingSession } from "~/data/types/shopping_sessiont"
import type { TuserId } from "~/data/types/user"

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

export const supabaseInsertShoppingSession = async(body: TInsertShoppingSession) => {
    const { error } = await useSupabaseClient<any>().from('shopping_session').insert({ 
        user_uuid: body.user_uuid,
        sub_total: body.sub_total ?? 0,
        total_payment: body.total_payment ?? 0
    })

    return { error }
}