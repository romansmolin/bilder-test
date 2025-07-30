import { useEffect, useState } from 'react'
import { Currency } from '@/entities/currency'
import { Fee } from '@/entities/fee'
import { DEFAULT_FEE } from '@/entities/fee/const/const'

interface UseCurrencyCalculatorProps {
    currencies: Currency[]
}

interface CalculatorState {
    amount: string
    fromCurrency: string
    toCurrency: string
    result: number | null
}

export const useCurrencyCalculator = ({ currencies }: UseCurrencyCalculatorProps) => {
    const [state, setState] = useState<CalculatorState>({
        amount: '',
        fromCurrency: '',
        toCurrency: '',
        result: null,
    })
    const [fees, setFees] = useState<Fee[]>([])

    useEffect(() => {
        const fetchFees = () => {
            try {
                const storedFees = localStorage.getItem('fees')
                if (storedFees) {
                    setFees(JSON.parse(storedFees))
                }
            } catch (error) {
                console.error('Error fetching fees:', error)
            }
        }

        fetchFees()
    }, [])

    const setAmount = (amount: string) => {
        setState((prev) => ({ ...prev, amount }))
    }

    const setFromCurrency = (currency: string) => {
        setState((prev) => ({ ...prev, fromCurrency: currency }))
    }

    const setToCurrency = (currency: string) => {
        setState((prev) => ({ ...prev, toCurrency: currency }))
    }

    const calculateConversion = () => {
        const { amount, fromCurrency, toCurrency } = state
        if (!amount || !fromCurrency || !toCurrency) return

        const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1
        const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1

        const configuredFee = fees.find((fee) => fee.from === fromCurrency && fee.to === toCurrency)
        const feeDecimal = (configuredFee?.value ?? DEFAULT_FEE) / 100

        const amountInEur = parseFloat(amount) / fromRate
        const convertedAmount = amountInEur * toRate

        const finalAmount = convertedAmount * (1 - feeDecimal)
        setState((prev) => ({ ...prev, result: Number(finalAmount.toFixed(2)) }))
    }

    return {
        amount: state.amount,
        fromCurrency: state.fromCurrency,
        toCurrency: state.toCurrency,
        result: state.result,
        setAmount,
        setFromCurrency,
        setToCurrency,
        calculateConversion,
        isCalculateDisabled: !state.amount || !state.fromCurrency || !state.toCurrency,
    }
}
