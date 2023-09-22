export const extractNumberFromString = (str: string): string => {
    const result = str.match(/\d+/g)
    if (result) {
        return result[0]
    }
    return '0'
}

