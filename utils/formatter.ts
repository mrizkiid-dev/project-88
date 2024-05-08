// Create our number formatter.
export const rupiahFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
});

export const currencyTonumber = (v: string): number => {
    if (!v) { 
        return 0 
    }
    v = v.split(',').join('')
    v = v.split('.').join('.')
    return Number(v.replace(/[^0-9.]/g, ""))
}

export const numberTocurrency = (v: number): string => {
    if (v === 0) { 
        return '0' 
    }
    const formattedValue = v.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return formattedValue
}
  