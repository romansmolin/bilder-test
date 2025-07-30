'use client'

import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog'
import { useDeleteFeeService } from '../hooks/use-delete-fee-service'

interface DeleteFeeButtonProps {
    feeId: string
}

const DeleteFeeButton: React.FC<DeleteFeeButtonProps> = ({ feeId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteFee } = useDeleteFeeService()

    const handleDelete = () => {
        deleteFee(feeId)
        setIsOpen(false)
        window.location.reload()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Fee</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this fee? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteFeeButton
