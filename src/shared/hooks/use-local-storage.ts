'use client'

import { useCallback, useEffect, useState } from 'react'

interface UseLocalStorageOptions<T> {
    key: string
    initialValue?: T
}

export function useLocalStorage<T>({ key, initialValue }: UseLocalStorageOptions<T>) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue
        }

        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error('Error reading from localStorage:', error)
            return initialValue
        }
    })

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore = value instanceof Function ? value(storedValue) : value

                // Save state
                setStoredValue(valueToStore)

                // Save to localStorage
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore))
                }
            } catch (error) {
                console.error('Error saving to localStorage:', error)
            }
        },
        [key, storedValue]
    )

    // Sync updates that happen in other windows/tabs
    useEffect(() => {
        function handleStorageChange(event: StorageEvent) {
            if (event.key === key && event.newValue) {
                try {
                    setStoredValue(JSON.parse(event.newValue))
                } catch (error) {
                    console.error('Error parsing localStorage change:', error)
                }
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange)
            return () => window.removeEventListener('storage', handleStorageChange)
        }
    }, [key])

    return [storedValue, setValue] as const
}
