'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Currency } from '@/entities/currency'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { MAX_FEES_NUMBER } from '../const/const'
import { Fee } from '../model/fee.types'

export interface FeeFormProps {
    currencies: Currency[]
    fees: Fee[]
    onAddFee: (fee: Omit<Fee, 'id'>) => void
    title?: string
    description?: string
}

const FeeForm: React.FC<FeeFormProps> = ({
    currencies,
    fees,
    onAddFee,
    title = 'Fee Editor',
    description = 'Manage currency exchange fees. Each fee represents the commission for converting from one currency to another.',
}) => {
    const [newFee, setNewFee] = useState({
        from: '',
        to: '',
        value: '',
    })

    const validateFee = (from: string, to: string, value: string): boolean => {
        if (from === to) return false
        const numValue = Number.parseFloat(value)
        if (isNaN(numValue) || numValue < 0) return false
        return true
    }

    const handleAddFee = () => {
        if (!newFee.from || !newFee.to || !newFee.value) return
        if (!validateFee(newFee.from, newFee.to, newFee.value)) return

        onAddFee({
            from: newFee.from,
            to: newFee.to,
            value: Number.parseFloat(newFee.value) / 100, // Convert percentage to decimal
        })

        setNewFee({ from: '', to: '', value: '' })
    }

    const isAddButtonDisabled = () => {
        if (!newFee.from || !newFee.to || !newFee.value) return true
        if (!validateFee(newFee.from, newFee.to, newFee.value)) return true
        const existingFee = fees.find((fee) => fee.from === newFee.from && fee.to === newFee.to)
        return !!existingFee
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Add New Fee Form */}
                <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold">Add New Fee</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="from-currency">From Currency</Label>
                            <Select
                                value={newFee.from}
                                onValueChange={(value) => setNewFee({ ...newFee, from: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.code} value={currency.code}>
                                            {currency.code}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="to-currency">To Currency</Label>
                            <Select
                                value={newFee.to}
                                onValueChange={(value) => setNewFee({ ...newFee, to: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.code} value={currency.code}>
                                            {currency.code}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fee-value">Fee (%)</Label>
                            <Input
                                id="fee-value"
                                type="number"
                                min="0"
                                step="0.1"
                                placeholder="e.g., 2.5"
                                value={newFee.value}
                                onChange={(e) => setNewFee({ ...newFee, value: e.target.value })}
                            />
                        </div>

                        <div className="flex items-end">
                            <Button
                                onClick={handleAddFee}
                                disabled={isAddButtonDisabled() || fees.length === MAX_FEES_NUMBER}
                                className="w-full"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Fee
                            </Button>
                        </div>
                    </div>

                    {/* Validation Messages */}
                    {newFee.from && newFee.to && newFee.from === newFee.to && (
                        <p className="text-sm text-red-600">From and To currencies cannot be the same</p>
                    )}
                    {newFee.value &&
                        (Number.parseFloat(newFee.value) < 0 ||
                            isNaN(Number.parseFloat(newFee.value))) && (
                            <p className="text-sm text-red-600">Fee value must be a positive number</p>
                        )}
                    {newFee.from &&
                        newFee.to &&
                        newFee.from !== newFee.to &&
                        fees.find((fee) => fee.from === newFee.from && fee.to === newFee.to) && (
                            <p className="text-sm text-red-600">
                                Fee for this currency pair already exists
                            </p>
                        )}
                </div>
            </CardContent>
        </Card>
    )
}

export default FeeForm
