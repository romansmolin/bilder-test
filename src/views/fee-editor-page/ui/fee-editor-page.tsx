import { getAvailableCurrencies } from '@/entities/currency'
import { NewFeeForm } from '@/features/fee/add-fee'
import React from 'react'

const FeeEditorPage = async () => {
    const availableCurrencies = await getAvailableCurrencies()

    console.log('availableCurrencies: ', availableCurrencies)

    return <NewFeeForm currencies={availableCurrencies} />
}

export default FeeEditorPage
