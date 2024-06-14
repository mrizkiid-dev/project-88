export type TCheckout = {
    id: number
    title: string
    imageSrc: string
    qty: number
    price: number
    weight: number
}

export type TShipping = {
    service: string
    price: number
    estimate: string
}