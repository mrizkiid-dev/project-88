import type { ITextfieldError } from "./textfield"

export interface IDropdownForm {
    title?: string,
    placeHolder?: string,
    isMandatory?: boolean,
    error?: ITextfieldError,
    choose?: IChoose[],
    loading?: boolean,
}

export interface IChoose {
    id: string
    name: string
}

export interface ICity extends IChoose {
    province_id?: string
}

export interface IDistrict extends IChoose {
    regency_id?: string
}
