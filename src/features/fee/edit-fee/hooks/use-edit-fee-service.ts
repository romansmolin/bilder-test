'use client'

import { useCallback, useEffect, useState } from 'react'
import { Fee } from '@/entities/fee/model/fee.types'

export const useEditFeeService = (initialFees?: Fee[]) => {
    const [fees, setFees] = useState<Fee[]>(initialFees || [])

    useEffect(() => {
        if (!initialFees) {
            const savedFees = localStorage.getItem('fees')
            if (savedFees) {
                try {
                    setFees(JSON.parse(savedFees))
                } catch (error) {
                    console.error('Error loading fees from localStorage:', error)
                }
            }
        }
    }, [initialFees])

    const updateFee = useCallback(
        (id: string, value: number) => {
            setFees((prevFees) => {
                const updatedFees = prevFees.map((fee) => (fee.id === id ? { ...fee, value } : fee))
                if (!initialFees) {
                    localStorage.setItem('fees', JSON.stringify(updatedFees))
                }
                return updatedFees
            })
        },
        [initialFees]
    )

    const deleteFee = useCallback(
        (id: string) => {
            setFees((prevFees) => {
                const updatedFees = prevFees.filter((fee) => fee.id !== id)
                if (!initialFees) {
                    localStorage.setItem('fees', JSON.stringify(updatedFees))
                }
                return updatedFees
            })
        },
        [initialFees]
    )

    const addFee = useCallback(() => {
        console.warn('Adding new fees is not supported in edit mode')
    }, [])

    return {
        fees,
        updateFee,
        deleteFee,
        addFee,
    }
}
