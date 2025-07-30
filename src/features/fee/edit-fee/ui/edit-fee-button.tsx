import React from 'react'
import { Edit2 } from 'lucide-react'
import { Fee } from '@/entities/fee'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog'
import { EditFeeForm } from './edit-fee-form'

const EditFeeButton = ({ fee }: { fee: Fee }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                    <Edit2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-10">
                <DialogTitle></DialogTitle>
                <EditFeeForm initialFees={[fee]} currencies={[]} />
            </DialogContent>
        </Dialog>
    )
}

export default EditFeeButton
