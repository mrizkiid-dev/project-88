import type { IChoose, ICity, IDistrict } from "../components/dropdownForm"

export interface ISignUpForm {
    fullname    : string
    email       : string
    password    : string
    waNumber    : number
    province    : IChoose | null
    city        : ICity | null
    district    : IDistrict | null
    address     : string
}

export interface ISignInForm {
    email : string
    password : string
}