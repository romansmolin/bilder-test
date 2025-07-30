import { getAvailableCurrencies } from '@/entities/currency'
import { CurrencyCalculator } from '@/features/currency'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import React from 'react'

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
