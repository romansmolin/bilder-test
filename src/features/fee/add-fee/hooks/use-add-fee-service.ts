'use client'

import { useCallback, useState } from 'react'
import { Fee } from '@/entities/fee/model/fee.types'

const useAddFeeService = () => {
    const [fees, setFees] = useState<Fee[]>([])

    useState(() => {
        const savedFees = localStorage.getItem('fees')
        if (savedFees) {
            try {
                setFees(JSON.parse(savedFees))
            } catch (error) {
                console.error('Error loading fees from localStorage:', error)
            }
        }
    })

    const generateId = () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }

    const addFee = useCallback((newFee: Omit<Fee, 'id'>) => {
        const fee: Fee = {
            ...newFee,
            id: generateId(),
        }

        setFees((prevFees) => {
            const updatedFees = [...prevFees, fee]
            localStorage.setItem('fees', JSON.stringify(updatedFees))
            return updatedFees
        })
    }, [])

    const updateFee = useCallback((id: string, value: number) => {
        setFees((prevFees) => {
            const updatedFees = prevFees.map((fee) => (fee.id === id ? { ...fee, value } : fee))
            localStorage.setItem('fees', JSON.stringify(updatedFees))
            return updatedFees
        })
    }, [])

    const deleteFee = useCallback((id: string) => {
        setFees((prevFees) => {
            const updatedFees = prevFees.filter((fee) => fee.id !== id)
            localStorage.setItem('fees', JSON.stringify(updatedFees))
            return updatedFees
        })
    }, [])

    return {
        fees,
        addFee,
        updateFee,
        deleteFee,
    }
}

export default useAddFeeService
