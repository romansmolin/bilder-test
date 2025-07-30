import Link from 'next/link'
import { ErrorCode, getErrorMessage } from '@/shared/lib/errors'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

interface ErrorPageProps {
    searchParams: Promise<{ code: ErrorCode }>
}

const ErrorPage: React.FC<ErrorPageProps> = async ({ searchParams }) => {
    const { code } = await searchParams
    const errorMessage = getErrorMessage(code)

    return (
        <div className="min-h-[50vh] grid place-items-center">
            <Card className="w-full max-w-lg p-6 text-center space-y-4">
                <h1 className="text-2xl font-bold text-foreground">Oops! Something went wrong</h1>
                <p className="text-muted-foreground">{errorMessage}</p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href={'/'}>Get Back</Link>
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default ErrorPage
