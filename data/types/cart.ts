import type { TDate } from "./user"

export type TCartInsert = {
    session_id: number
    product_id: number | string
    qty: number
    image_url: string
} & TDate