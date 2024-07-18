import { supabaseCreateOrder, supabaseGetMidtransTokenById, supabaseGetOrderDetailById, supabaseGetOrderPagination, supabaseGetTotalOrdersRow, supabaseUpdateOrder } from "../source/network/order_supabase"
import type { TCreateOrder, TOrderItem } from "../types/order"
import type { TParamsOrderPagination } from "../types/params"

export const createOrder = async(order: Partial<TCreateOrder>, orderItem: TOrderItem[]) => {
    const { data, error } = await supabaseCreateOrder(order, orderItem)
    return { data, error }
}

export const updateOrder = async(orderId: number | undefined, body: Prettify<Partial<TCreateOrder>>) => {
    const { error } = await supabaseUpdateOrder(orderId, body)
    return { error }
}

export const getOrderDetailByID = async(orderId: string | string[]) => {
    const { data, error } = await supabaseGetOrderDetailById(orderId)

    return { data, error }
}

export const getMidtransTokenById = async(orderId: string | string[]) => {
    const { data, error } = await supabaseGetMidtransTokenById(orderId)
    return { data, error }
}

export const getOrderPagination = async(params: TParamsOrderPagination) => {
    const { data, error } = await supabaseGetOrderPagination(params)
    return { data, error}
}

export const getTotalOrdersRow = async(sessionId: number | string) => {
    const { count, error } = await supabaseGetTotalOrdersRow(sessionId)
    return { count, error }
}