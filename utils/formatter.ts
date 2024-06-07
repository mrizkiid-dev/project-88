// Create our number formatter.
export const rupiahFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
});

export const currencyTonumber = (v: string | null | undefined): number => {
    if (!v) { 
        return 0 
    }
    v = v.split(',').join('')
    v = v.split('.').join('.')
    return Number(v.replace(/[^0-9.]/g, ""))
}

export const numberTocurrency = (v: number | null | undefined): string => {
    if (v === 0 || v === null || v === undefined) { 
        return '0' 
    }
    const formattedValue = v.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return formattedValue
}

export const onParseDate = (dateString: string): string => {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = getMonthName(date.getMonth())
    const day = date.getDate()

    return `${month} ${day}, ${year}`
}
const getMonthName = (month: number) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month - 1];
};