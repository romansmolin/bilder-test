'use client'

import React, { useState } from 'react'
import { Check, Edit2, Trash2, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Fee } from '../model/fee.types'

interface FeeListProps {
    onDeleteFee: (id: string) => void
    onUpdateFee: (id: string, value: number) => void
    fees: Fee[]
}

const FeeList: React.FC<FeeListProps> = ({ onDeleteFee, fees, onUpdateFee }) => {
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editValue, setEditValue] = useState('')

    const startEditing = (fee: Fee) => {
        setEditingId(fee.id)
        setEditValue((fee.value * 100).toString()) // Convert to percentage for display
    }

    const saveEdit = (id: string) => {
        const numValue = Number.parseFloat(editValue) / 100 // Convert back to decimal
        if (isNaN(numValue) || numValue < 0) return

        onUpdateFee(id, numValue)
        setEditingId(null)
        setEditValue('')
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditValue('')
    }

    const formatPercentage = (value: number) => {
        return `${(value * 100).toFixed(1)}%`
    }
    return (
        <Card className="space-y-4 w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Current Fees ({fees.length})</CardTitle>
            </CardHeader>
            <CardContent>
                {fees.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No fees configured yet. Add your first fee above.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {fees.map((fee) => (
                            <div
                                key={fee.id}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-blue-600">{fee.from}</span>
                                        <span className="text-gray-400">→</span>
                                        <span className="font-medium text-green-600">{fee.to}</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {editingId === fee.id ? (
                                            <div className="flex items-center space-x-2">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="0.1"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="w-20"
                                                />
                                                <span className="text-sm text-gray-500">%</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => saveEdit(fee.id)}
                                                    disabled={
                                                        !editValue ||
                                                        Number.parseFloat(editValue) < 0 ||
                                                        isNaN(Number.parseFloat(editValue))
                                                    }
                                                >
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={cancelEdit}>
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-lg">
                                                    {formatPercentage(fee.value)}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => startEditing(fee)}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => onDeleteFee(fee.id)}
                                    disabled={editingId === fee.id}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default FeeList
