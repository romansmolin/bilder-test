'use client'

import React from 'react'
import { DeleteFeeButton, EditFeeButton } from '@/features/fee'
import { useLocalStorage } from '@/shared/hooks/use-local-storage'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Fee } from '../model/fee.types'

const FeeList = () => {
    const [fees] = useLocalStorage<Fee[]>({
        key: 'fees',
        initialValue: [],
    })
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
                                <div className="flex items-center justify-between w-full space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-blue-600">{fee.from}</span>
                                        <span className="text-gray-400">→</span>
                                        <span className="font-medium text-green-600">{fee.to}</span>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <span>{(fee.value * 100).toFixed(1)}%</span>

                                        <div className="flex items-center space-x-2">
                                            <EditFeeButton fee={fee} />
                                            <DeleteFeeButton feeId={fee.id} />
                                        </div>
                                    </div>
                                </div>

                                <div></div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default FeeList
