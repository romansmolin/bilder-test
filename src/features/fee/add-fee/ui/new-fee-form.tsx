'use client'

import FeeForm from '@/entities/fee/ui/fee-form'
import useAddFeeService from '../hooks/use-add-fee-service'
import { Currency } from '@/entities/currency'
import FeeList from '@/entities/fee/ui/fee-list'
import { Alert, AlertTitle } from '@/shared/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { MAX_FEES_NUMBER } from '@/entities/fee'

interface NewFeeFormProps {
    currencies: Currency[]
}

const NewFeeForm: React.FC<NewFeeFormProps> = ({ currencies }) => {
    const { fees, addFee, updateFee, deleteFee } = useAddFeeService()

    return (
        <div className="flex flex-col space-y-6 w-full">
            {fees.length >= MAX_FEES_NUMBER && (
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
                onAddFee={addFee}
                title="Add New Fees"
                description="Create and manage new currency exchange fees. Each fee represents the commission for converting from one currency to another."
            />
            <FeeList onUpdateFee={updateFee} onDeleteFee={deleteFee} fees={fees} />
        </div>
    )
}

export default NewFeeForm
