import React, { Suspense } from 'react'
import { FeeEditorPage } from '@/views/fee-editor-page'
import LoadingIndicator from '@/shared/ui/loading-indicator'

const FeeEditor = () => {
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <FeeEditorPage />
        </Suspense>
    )
}

export default FeeEditor
