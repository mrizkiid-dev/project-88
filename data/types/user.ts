// export type TuserId = number | string | null

export type TDate = {
    createdAt?: string
    modifiedAt?: string
}

export type TBodyInsertUser = {
    uuid: string
    name: string
    email: string | undefined
} & TDate