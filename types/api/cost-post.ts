export type TCostPost = {
    origin  : number
    destination : number
    weight  : number
    courier : string
}

export type TCostResponse = {
    service: string
    price: number
    estimate : string
}

export type TCostResponseDetail = {
    value: number
    etd : string
}