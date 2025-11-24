import { useIntl } from 'react-intl'
import { useCallback, useMemo } from 'react'

type TranslationValues = Record<string, string | number | Date>

type NumberFormatOptions = Intl.NumberFormatOptions
type DateFormatOptions = Intl.DateTimeFormatOptions

export function useTranslation() {
    const intl = useIntl()

    const formatMessage = useCallback(
        (key: string, values?: TranslationValues) => 
            intl.formatMessage({ id: key }, values),
        [intl]
    )
    
    const formatNumber = useCallback(
        (value: number, options?: NumberFormatOptions) =>
            intl.formatNumber(value, options),
        [intl]
    )
        
    const formatDate = useCallback(
        (value: Date, options?: DateFormatOptions) =>
            intl.formatDate(value, options),
        [intl]
    )
        
    const formatCurrency = useCallback(
        (value: number, currency: string) =>
            intl.formatNumber(value, { 
                style: 'currency', 
                currency 
            }),
        [intl]
    )

    return useMemo(() => ({
        formatMessage,
        formatNumber,
        formatDate,
        formatCurrency
    }), [formatMessage, formatNumber, formatDate, formatCurrency])
}