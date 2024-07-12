import type { TBodyInsertUser } from "~/data/types/user";
import type { TuserId } from "~/data/types/params";


export const supabaseGetUserCountById = async(id: TuserId) => {
    const { count , error } = await useSupabaseClient<any>()
                .from('user')
                .select('*', { count: 'exact', head: true })
                .eq('uuid', id )
            console.log('data user = ',count);
    return { count, error }
}

export const supabaseInsertUser = async(body: Prettify<TBodyInsertUser>[]) => {
    const { error } = await useSupabaseClient<any>().from('user').insert(body)

    return { error }
}