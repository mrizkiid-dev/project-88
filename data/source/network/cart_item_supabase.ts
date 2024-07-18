import type { TInsertCartItem } from "~/data/types/cart_item"

export const supabaseGetCartItemProductDetail = async(productId: string | string[], sessionId: string | number) => {
    const { data , error } = await useSupabaseClient<any>().from('cart_item').select('id').eq('product_id', productId).eq('session_id', sessionId)
    return { data, error }
}

export const supabaseInsertCartItem = async(body: TInsertCartItem[]) => {
    const { error } = await useSupabaseClient<any>().from('cart_item').insert(body)
    return { error }
}

export const supabaseGetCartItemProducts = async(sessionId: string | number) => {
    const {data , error} = await useSupabaseClient<any>().from('cart_item').select(`id,qty,product(id,name,price,product_image(image_url),qty,weight)`).eq('session_id',sessionId).returns<{id: any;
        qty: any;
        product: {
            id: any
            name: any;
            price: any;
            qty: any
            weight: any
            product_image: {
                image_url: any;
            }[];
        };
    }[]>()

    return { data, error }
}

export const supabaseDeleteCartItem = async(id: string | number) => {
    const { error } = await useSupabaseClient()
                .from('cart_item')
                .delete()
                .eq('id', id)

    return { error }
}