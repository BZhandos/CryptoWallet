export function useAmount() {
    const digitsGetter = (amount: string) => {
        if (!amount.includes('.')) {
            return amount
        }
        let lastIdx = amount.length -1
        while (lastIdx > 0) {
            if (amount[lastIdx] === '0' ) {
                lastIdx--
            } else break;
        }
        return amount.slice(0, lastIdx+1)
    }

    const zerosGetter = (amount: string) => {
        if (!amount.includes('.')) {
            return ''
        }
        let zeroDigits = ''
        let lastIdx = amount.length -1
        while (lastIdx > 0) {
            if (amount[lastIdx] === '0' ) {
                zeroDigits+=0
                lastIdx--
            } else break;
        }
        return zeroDigits
    }
    const clarifiedNumber = (amount: string) => {
        const number = Number(amount)
        return isNaN(number) ? amount : number.toLocaleString()
    }

    return {
        clarifiedNumber,
        digitsGetter,
        zerosGetter
    }
}