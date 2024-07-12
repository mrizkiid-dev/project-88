import type { TDate } from "./user"

export type TInsertShoppingSession = {
    user_uuid: string
    sub_total?: number
    total_payment?: number
    is_done?: boolean
} & TDate
