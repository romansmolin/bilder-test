import React from 'react'
import { CurrencyCalculator } from '@/features/currency'
import { getAvailableCurrencies } from '@/entities/currency'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

const CalculatorEditorPage = async () => {
    const availableCurrencies = await getAvailableCurrencies()

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>Currency Calculator</CardTitle>
                <CardDescription>Settled fees will be automatically applied!</CardDescription>
            </CardHeader>
            <CardContent>
                <CurrencyCalculator currencies={availableCurrencies} />
            </CardContent>
        </Card>
    )
}

export default CalculatorEditorPage
