export interface ITextField {
    title?: string,
    placeHolder?: string,
    isPassword?: boolean,
    isMandatory?: boolean,
    error?: ITextfieldError,
    inputType?: string
}

export interface ITextfieldError {
    value: boolean
    message: string
}