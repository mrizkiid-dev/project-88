import type { ICart } from "../pages/cart"

export type profile = {
    uuid: string
    sessionId: string
    name: string
    emal: string
    phoneNumber: string
    province: province
    city: city
    district: string
    additionalAddress: string
    cart: ICart[]
}

export type city = {
    id: string | number
    name: string
}

export type province = {
    id: string | number
    name: string
}