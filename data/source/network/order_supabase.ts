import type { TCreateOrder, TOrderItem } from "~/data/types/order";

export const supabaseCreateOrder = async(order: Partial<TCreateOrder>, orderItem: TOrderItem[]) => {
    const { data, error } = await useSupabaseClient<any>().rpc('create_order', {
        _order: order,
        _order_itemt: orderItem
    }).returns<{
        status: string
        message: string
        order_id?: number
    } | undefined>()

    return { data, error }
}

export const supabaseUpdateOrder = async(orderId: number | undefined, body: Partial<TCreateOrder>) => {
    const { error } = await useSupabaseClient<any>().from('order').update(body).eq('id', orderId)

    return { error }
}
