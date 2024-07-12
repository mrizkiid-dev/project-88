import type { TBodyInsertUser, TuserId } from "~/data/types/user";

export const supabaseGetUserCountById = async(id: TuserId) => {
    const { count , error } = await useSupabaseClient<any>()
                .from('user')
                .select('*', { count: 'exact', head: true })
                .eq('uuid', id )
            console.log('data user = ',count);
    return { count, error }
}

export const supabaseInsertUser = async(body: Prettify<TBodyInsertUser>) => {
    const { error } = await useSupabaseClient<any>().from('user').insert({ 
        uuid: body.uuid,
        name: body.name,
        email: body.email
    })

    return { error }
}