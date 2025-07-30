export enum ErrorCode {
    EXCHANGE_RATES_NOT_FOUND = 'EXCHANGE_RATES_NOT_FOUND',
    API_ERROR = 'API_ERROR',
    NETWORK_ERROR = 'NETWORK_ERROR',
}

export interface AppError {
    code: ErrorCode
    message: string
    details?: Record<string, unknown>
}

export class ApplicationError extends Error {
    constructor(public error: AppError) {
        super(error.message)
        this.name = 'ApplicationError'
    }
}

export const getErrorMessage = (code: ErrorCode): string => {
    const messages: Record<ErrorCode, string> = {
        [ErrorCode.EXCHANGE_RATES_NOT_FOUND]: 'Exchange rates data is currently unavailable',
        [ErrorCode.API_ERROR]: 'An error occurred while fetching data from the API',
        [ErrorCode.NETWORK_ERROR]: 'Network connection error occurred',
    }
    return messages[code] || 'An unexpected error occurred'
}
