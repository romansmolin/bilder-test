'use client'

import { useCallback } from 'react'
import { Fee } from '@/entities/fee/model/fee.types'
import useLocalStorage from '@/shared/hooks/use-local-storage'

const useAddFeeService = () => {
    const [fees, setFees] = useLocalStorage<Fee[]>({
        key: 'fees',
        initialValue: [],
    })

    const generateId = () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }

    const addFee = useCallback(
        (newFee: Omit<Fee, 'id'>) => {
            // Validate fee is between 0 and 1 (0% to 100%)
            if (newFee.value < 0 || newFee.value > 1) {
                console.error('Fee must be between 0 and 1 (0% to 100%)')
                return
            }

            const fee: Fee = {
                ...newFee,
                id: generateId(),
            }

            setFees((prevFees) => [...prevFees, fee])
        },
        [setFees]
    )

    return {
        fees,
        addFee,
    }
}

export default useAddFeeService
