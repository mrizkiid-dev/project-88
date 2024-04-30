export const stringToNumber = (input: string | number): string => {
    if(typeof input === 'number') {
        return input.toString()
    }

    return input
}