export interface ISignUpForm {
    fullname    : string
    email       : string
    password    : string
    waNumber    : number
    province    : string
    city        : string
    district    : string
    address     : string
}

export interface ISignInForm {
    email : string
    password : string
}