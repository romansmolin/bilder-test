'use client'

import FeeForm from '@/entities/fee/ui/fee-form'
import { useEditFeeService } from '../hooks/use-edit-fee-service'
import { Fee } from '@/entities/fee/model/fee.types'

interface EditFeeFormProps {
    currencies: string[]
    initialFees?: Fee[]
}

export const EditFeeForm: React.FC<EditFeeFormProps> = ({ currencies, initialFees }) => {
    const { fees, addFee, updateFee, deleteFee } = useEditFeeService(initialFees)

    return (
        <FeeForm
            currencies={currencies}
            fees={fees}
            onAddFee={addFee}
            onUpdateFee={updateFee}
            onDeleteFee={deleteFee}
            title="Edit Fees"
            description="Modify existing currency exchange fees. Each fee represents the commission for converting from one currency to another."
        />
    )
}
