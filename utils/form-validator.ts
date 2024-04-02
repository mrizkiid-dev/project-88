export const emailValidator = (email: string) : boolean => {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if(pattern.test(email)) {
        return true
    }

    return false
}

export const passwordValidator = (password: string) : boolean => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    if(pattern.test(password)) {
        return true
    }

    return false
}