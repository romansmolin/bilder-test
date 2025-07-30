'use client'

import React from 'react'
import { Currency } from '@/entities/currency/model/currency.type'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useCurrencyCalculator } from '../hooks/use-currency-calculator'

interface CurrencyCalculatorProps {
    currencies: Currency[]
}

const CurrencyCalculator: React.FC<CurrencyCalculatorProps> = ({ currencies }) => {
    const {
        amount,
        fromCurrency,
        toCurrency,
        result,
        setAmount,
        setFromCurrency,
        setToCurrency,
        calculateConversion,
        isCalculateDisabled,
    } = useCurrencyCalculator({ currencies })

    return (
        <div className="space-y-6 p-6">
            <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>From Currency</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                            {currencies.map((currency) => (
                                <SelectItem key={currency.code} value={currency.code}>
                                    {currency.code}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>To Currency</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                            {currencies.map((currency) => (
                                <SelectItem key={currency.code} value={currency.code}>
                                    {currency.code}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button onClick={calculateConversion} disabled={isCalculateDisabled} className="w-full">
                Calculate
            </Button>

            {result !== null && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                    <p className="text-center">
                        <span className="font-semibold">{amount}</span> {fromCurrency} =
                        <span className="font-semibold"> {result}</span> {toCurrency}
                    </p>
                </div>
            )}
        </div>
    )
}

export default CurrencyCalculator
