import { describe, it, expect } from 'vitest'
import { useAmount} from "../useAmount";

const { digitsGetter, zerosGetter, clarifiedNumber } = useAmount()


describe('digitsGetter', () => {
    it('Testing number : 123.456000', () => {
        const number = digitsGetter('123.456000')
        expect(number).toBe('123.456')
    })
    it('Testing number : 123.456', () => {
        const number = digitsGetter('123.456')
        expect(number).toBe('123.456')
    })
    it('Testing number : 123', () => {
        const number = digitsGetter('123')
        expect(number).toBe('123')
    })
})

describe('zerosGetter', () => {
    it('Testing number : 123.456000', () => {
        const number = zerosGetter('123.456000')
        expect(number).toBe('000')
    })
    it('Testing number : 123.00456', () => {
        const number = zerosGetter('123.00456')
        expect(number).toBe('')
    })
    it('Testing number : 123', () => {
        const number = zerosGetter('123')
        expect(number).toBe('')
    })
})

describe('clarifiedNumber', () => {
    it('Testing number : 123.456000', () => {
        const number = clarifiedNumber('123.456')
        expect(number).toBe('123.456')
    })
    it('Testing number : 123.4567', () => {
        const number = clarifiedNumber('123.4567')
        expect(number).toBe('123.457')
    })
    it('Testing number : 123', () => {
        const number = clarifiedNumber('123')
        expect(number).toBe('123')
    })
    it('Testing number : 123456', () => {
        const number = clarifiedNumber('123456')
        expect(number).toBe('123,456')
    })
    it('Testing number : 123456.123456', () => {
        const number = clarifiedNumber('123456.123456')
        expect(number).toBe('123,456.123')
    })
})
