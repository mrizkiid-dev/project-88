export type TParamsGetProducts = {
    rangeFrist?: number
    rangeLast?: number
}

export type TuserId = number | string | null

export type TParamsOrderPagination = {sessionId: string | number, start: number, offset: number}

export type TParamsGetProductSearch = {
    keyword: string, start: number, offset: number ,isAscending: boolean
}

export type TParamsGetProductByRow = {
    start: number, offset: number ,isAscending: boolean
}