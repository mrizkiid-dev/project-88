import type { TCreateOrder, TOrderItem } from "~/data/types/order";
import type { TParamsOrderPagination } from "~/data/types/params";
import type { TResponseOrder } from "~/types/components/order";

export const supabaseCreateOrder = async(order: Partial<TCreateOrder>, orderItem: TOrderItem[]) => {
    const { data, error } = await useSupabaseClient<any>().rpc('create_order', {
        _order: order,
        _order_item: orderItem
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

export const supabaseGetOrderDetailById = async(orderId: string | string[]) => {
    const { data, error } = await useSupabaseClient<any>().from('order').select('id,name_receiver,detail_address,city,city_id,province,province_id,created_at,shipping_price,sub_total,total_payment,order_item(product_id,product_name,quantity,price,image_url)').eq('id',orderId).limit(1)
    return { data, error }
}

export const supabaseGetMidtransTokenById = async(orderId: string | string[]) => {
    const { data, error } = await useSupabaseClient().from('order').select('midtrans_token').eq('id', orderId)
    return { data, error }
}

export const supabaseGetOrderPagination = async(params: TParamsOrderPagination ) => {
    const { data, error } = await useSupabaseClient<any>().from('order').select('id,created_at,total_payment,order_item(product_id,product_name,quantity,price,image_url)')
                .eq('shopping_session_id',params.sessionId)
                .range(params.start, params.offset)
                .limit(2, { foreignTable: 'order_item' }).order('id',{ ascending: false })
                .returns<TResponseOrder[]>()
    
    return { data, error }
}

export const supabaseGetTotalOrdersRow = async(sessionId: string | number) => {
    const { count, error } = await useSupabaseClient<any>().from('order').select('id', { count: 'exact', head: true }).eq('shopping_session_id',sessionId)
    return { count, error }
}