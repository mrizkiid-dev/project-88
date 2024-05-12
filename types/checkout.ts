export type TCheckout = {
    id: number
    title: string
    imageSrc: string
    qty: number
    price: number
}

export type TShipping = {
    code: string
    name: string
    service: string
    description: string
    price: number
    estimate: string
}