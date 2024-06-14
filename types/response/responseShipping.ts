export type responseProvince = {
    data: province[]
}

export type province = {
    province_id: string,
    province: string
}

export type responseCities = {
    data: city[]
}

export type city = {
    city_id: string
    province_id: string
    province: string
    type: string
    city_name: string
    postal_code: string
}

// export type responseProvince = {
//     data: province[]
// }

// export type province = {
//     province_id: string,
//     province: string
// }
