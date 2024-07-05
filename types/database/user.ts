//type
type TDateDatabase = {
    created_at: string
    modified_at: string
}

export type TUser = {
    id: number
    uuid: string
    name: string
    email: string
} & TDateDatabase

export type TUserAddress = {
    id: number,
    user_uuid: string,
    whatsapp_number: number
    province_id: number
    province: string
    city_id: number
    city: string
    district: string
    addtional_address: string
    postal_code: string
} & TDateDatabase