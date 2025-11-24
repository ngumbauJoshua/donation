import { createIntl, createIntlCache } from 'react-intl'
import enMessages from './messages/en'

export const LOCALES = {
    ENGLISH: 'en',
} as const

export type LocaleType = keyof typeof LOCALES

export const messages = {
    ENGLISH: enMessages,
} as const

// Get browser's language or fallback to English
export const getDefaultLocale = (): LocaleType => {
    const browserLang = navigator.language.split(/[-_]/)[0]
    const langMap: Record<string, LocaleType> = {
        'en': 'ENGLISH',
    }
    return langMap[browserLang] || 'ENGLISH'
}

const cache = createIntlCache()

export const intl = createIntl({
    locale: LOCALES[getDefaultLocale()],
    messages: messages[getDefaultLocale()],
    defaultLocale: LOCALES.ENGLISH,
}, cache) 