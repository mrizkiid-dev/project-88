export type TOrdersComponent = {
    orderId: number,
    orderDate: string,
    sub_total?: number,
    shipping_price?: number,
    totalPayment: number,
    items: TOrdersItemComponent[]
}

export type TOrdersItemComponent = {
    id: number,
    title: string,
    imageSrc: string,
    qty: number,
    totalPrice: number,
}

export type TResponseOrder = {
    id: number,
    shipping_price: number,
    sub_total: number,
    total_payment: number,
    order_item: {
        product_id: number,
        product_name: string,
        image_url: string,
        quantity: number,
        price: number
    }[],
    created_at: string
}