export type TMidItemDetails = {
    id: string,
    price: number,
    quantity: number,
    name: string,
}

export type TMidCustomer = {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    shipping_address: {
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        address: string,
        city: string,
        country_code: 'IDN'
    }
}

export type TSnapCreateTransaction = {
    id: string | number
    product: TMidItemDetails[],
    customer_detail: TMidCustomer,
    gross_amount: number
}