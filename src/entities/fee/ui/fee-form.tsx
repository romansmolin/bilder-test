'use client'

import { Plus } from 'lucide-react'
import { Currency } from '@/entities/currency'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { MAX_FEES_NUMBER } from '../const/const'
import { Fee } from '../model/fee.types'

export interface FeeFormData {
    from: string
    to: string
    value: string
}

export interface FeeFormProps {
    currencies: Currency[]
    fees: Fee[]
    formData: FeeFormData
    onSubmit: (fee: Omit<Fee, 'id'>) => void
    onChange: (data: FeeFormData) => void
    title?: string
    description?: string
    submitLabel?: string
    currentFeeId?: string
}

const FeeForm: React.FC<FeeFormProps> = ({
    currencies,
    fees,
    formData,
    onSubmit,
    onChange,
    title = 'Fee Editor',
    description = 'Manage currency exchange fees. Each fee represents the commission for converting from one currency to another.',
    submitLabel = 'Add Fee',
    currentFeeId,
}) => {
    const validateFee = (from: string, to: string, value: string): boolean => {
        if (from === to) return false
        const numValue = Number.parseFloat(value)
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return false
        return true
    }

    const handleSubmit = () => {
        if (!formData.from || !formData.to || !formData.value) return
        if (!validateFee(formData.from, formData.to, formData.value)) return

        onSubmit({
            from: formData.from,
            to: formData.to,
            value: Number.parseFloat(formData.value) / 100, // Convert percentage to decimal (e.g., 2.5% -> 0.025)
        })
    }

    const isSubmitButtonDisabled = () => {
        if (!formData.from || !formData.to || !formData.value) return true
        if (!validateFee(formData.from, formData.to, formData.value)) return true

        // Check for duplicate fee pair, excluding the current fee being edited
        const existingFee = fees.find(
            (fee) => fee.from === formData.from && fee.to === formData.to && fee.id !== currentFeeId
        )
        return !!existingFee
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="from-currency">From Currency</Label>
                            <Select
                                value={formData.from}
                                onValueChange={(value) => onChange({ ...formData, from: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies?.map((currency) => (
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
                                value={formData.to}
                                onValueChange={(value) => onChange({ ...formData, to: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies?.map((currency) => (
                                        <SelectItem key={currency.code} value={currency.code}>
                                            {currency.code}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fee-value">Fee</Label>
                            <Input
                                id="fee-value"
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                placeholder="e.g., 2.5"
                                value={formData.value}
                                onChange={(e) => onChange({ ...formData, value: e.target.value })}
                            />
                        </div>

                        <div className="flex items-end">
                            <Button
                                onClick={handleSubmit}
                                disabled={
                                    isSubmitButtonDisabled() ||
                                    (!currentFeeId && fees.length >= MAX_FEES_NUMBER)
                                }
                                className="w-full"
                            >
                                {!currentFeeId && <Plus className="w-4 h-4 mr-2" />}
                                {submitLabel}
                            </Button>
                        </div>
                    </div>

                    {formData.value &&
                        (Number.parseFloat(formData.value) < 0 ||
                            Number.parseFloat(formData.value) > 100) && (
                            <p className="text-sm text-red-600">Fee must be between 0% and 100%</p>
                        )}
                    {formData.from && formData.to && formData.from === formData.to && (
                        <p className="text-sm text-red-600">From and To currencies cannot be the same</p>
                    )}
                    {formData.from &&
                        formData.to &&
                        formData.from !== formData.to &&
                        fees.find(
                            (fee) =>
                                fee.from === formData.from &&
                                fee.to === formData.to &&
                                fee.id !== currentFeeId
                        ) && (
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
