export type TCreateOrder = {
    shopping_session_id: string | number,
    name_receiver: string,
    detail_address: string,
    city_id: number | string,
    city: string,
    province_id: number | string,
    province: string,
    sub_total: number,
    total_payment: number,
    shipping_price: number,
    midtrans_id?: string, 
    midtrans_token?: string,
}

export type TOrderItem = {
    product_id: number;
    product_name: string;
    image_url: string;
    price: number;
    quantity: number;
}