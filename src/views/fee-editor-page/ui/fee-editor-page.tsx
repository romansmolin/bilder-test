import React from 'react'
import { NewFeeForm } from '@/features/fee/add-fee'
import { getAvailableCurrencies } from '@/entities/currency'

const FeeEditorPage = async () => {
    const availableCurrencies = await getAvailableCurrencies()

    return <NewFeeForm currencies={availableCurrencies} />
}

export default FeeEditorPage
