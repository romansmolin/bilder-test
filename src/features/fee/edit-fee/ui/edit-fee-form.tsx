'use client'

import { useState } from 'react'
import { Currency } from '@/entities/currency'
import { Fee } from '@/entities/fee/model/fee.types'
import FeeForm, { FeeFormData } from '@/entities/fee/ui/fee-form'
import { useEditFeeService } from '../hooks/use-edit-fee-service'

interface EditFeeFormProps {
    currencies: Currency[]
    initialFees?: Fee[]
}

export const EditFeeForm: React.FC<EditFeeFormProps> = ({ currencies, initialFees }) => {
    const { fees, updateFee } = useEditFeeService(initialFees)
    const [formData, setFormData] = useState<FeeFormData>(() => {
        // Initialize form with the first fee's data if available
        if (initialFees?.[0]) {
            const fee = initialFees[0]
            return {
                from: fee.from,
                to: fee.to,
                value: (fee.value * 100).toFixed(1), // Convert decimal to percentage with 1 decimal place
            }
        }
        return { from: '', to: '', value: '' }
    })

    const handleSubmit = (fee: Omit<Fee, 'id'>) => {
        if (initialFees?.[0]) {
            updateFee(initialFees[0].id, fee.value)
        }
    }

    return (
        <FeeForm
            currencies={currencies}
            fees={fees}
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            title="Edit Fee"
            description="Modify currency exchange fee. Each fee represents the commission for converting from one currency to another."
            submitLabel="Save Changes"
            currentFeeId={initialFees?.[0]?.id}
        />
    )
}
