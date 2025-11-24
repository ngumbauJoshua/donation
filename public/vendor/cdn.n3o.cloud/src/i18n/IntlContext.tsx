import React from 'react'
import { LocaleType, getDefaultLocale } from './config'

export const IntlContext = React.createContext<{
    locale: LocaleType;
    setLocale: (locale: LocaleType) => void;
}>({
    locale: getDefaultLocale(),
    setLocale: () => void 0,
})