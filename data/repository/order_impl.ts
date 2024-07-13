import { supabaseCreateOrder, supabaseUpdateOrder } from "../source/network/order_supabase"
import type { TCreateOrder, TOrderItem } from "../types/order"

export const createOrder = async(order: Partial<TCreateOrder>, orderItem: TOrderItem[]) => {
    const { data, error } = await supabaseCreateOrder(order, orderItem)
    return { data, error }
}

export const updateOrder = async(orderId: number | undefined, body: Prettify<Partial<TCreateOrder>>) => {
    const { error } = await supabaseUpdateOrder(orderId, body)
    return { error }
}