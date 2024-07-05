import type { IChoose, ICity } from "./dropdownForm"

export type TAddress = {
    telephone   : string
    province    : IChoose | null
    city        : ICity | null
    address     : string
}