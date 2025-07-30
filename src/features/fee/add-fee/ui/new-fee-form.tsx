'use client'

import { useState } from 'react'
import { AlertCircleIcon } from 'lucide-react'
import { Currency } from '@/entities/currency'
import { Fee, FeeForm, MAX_FEES_NUMBER } from '@/entities/fee'
import type { FeeFormData } from '@/entities/fee/ui/fee-form'
import { Alert, AlertTitle } from '@/shared/ui/alert'
import useAddFeeService from '../hooks/use-add-fee-service'

interface NewFeeFormProps {
    currencies: Currency[]
}

const NewFeeForm: React.FC<NewFeeFormProps> = ({ currencies }) => {
    const { fees, addFee } = useAddFeeService()

    const [formData, setFormData] = useState<FeeFormData>({
        from: '',
        to: '',
        value: '',
    })

    const handleSubmit = (fee: Omit<Fee, 'id'>) => {
        addFee(fee)
        setFormData({ from: '', to: '', value: '' })
        location.reload()
    }

    return (
        <div className="flex flex-col space-y-6 w-full">
            {fees.length >= Number(MAX_FEES_NUMBER) && (
                <Alert variant={'destructive'}>
                    <AlertCircleIcon />
                    <AlertTitle>
                        Maximal fee number is reached! Please update your subscription!
                    </AlertTitle>
                </Alert>
            )}
            <FeeForm
                currencies={currencies}
                fees={fees}
                formData={formData}
                onChange={setFormData}
                onSubmit={handleSubmit}
                title="Add New Fees"
                description="Create and manage new currency exchange fees. Each fee represents the commission for converting from one currency to another."
            />
        </div>
    )
}

export default NewFeeForm
