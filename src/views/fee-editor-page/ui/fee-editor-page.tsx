import React from 'react'
import { NewFeeForm } from '@/features/fee'
import { getAvailableCurrencies } from '@/entities/currency'
import { FeeList } from '@/entities/fee'

const FeeEditorPage = async () => {
    const availableCurrencies = await getAvailableCurrencies()
    // if we had an api we could prefetch it here

    return (
        <>
            <NewFeeForm currencies={availableCurrencies} />
            <FeeList />
        </>
    )
}

export default FeeEditorPage
