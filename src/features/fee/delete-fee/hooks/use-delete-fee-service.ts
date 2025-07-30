'use client'

import { useCallback } from 'react'
import { Fee } from '@/entities/fee/model/fee.types'
import { useLocalStorage } from '@/shared/hooks/use-local-storage'

export const useDeleteFeeService = () => {
    const [, setFees] = useLocalStorage<Fee[]>({
        key: 'fees',
        initialValue: [],
    })

    const deleteFee = useCallback(
        (id: string) => {
            try {
                setFees((prevFees) => prevFees.filter((fee) => fee.id !== id))
                return true
            } catch (error) {
                console.error('Error deleting fee:', error)
                return false
            }
        },
        [setFees]
    )

    return {
        deleteFee,
    }
}
