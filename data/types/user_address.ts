import type { TDate } from "./user"

export type TUserAddressp = {
    whatsapp_number?: number | string
    province_id?: number | string
    province?: string
    city_id?: number | string
    city?: string
    additional_address?: string
    postal_code?: number | string
} & TDate