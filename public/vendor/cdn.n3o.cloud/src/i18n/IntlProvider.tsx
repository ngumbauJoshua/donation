import { ReactNode, useState } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { IntlContext } from './IntlContext';
import { LOCALES, LocaleType, messages, getDefaultLocale } from './config'

interface Props {
    children: ReactNode
}

export function IntlProvider({ children }: Props) {
	const [locale, setLocale] = useState<LocaleType>(getDefaultLocale());

	return (
		<IntlContext.Provider value={{ locale, setLocale }}>
			<ReactIntlProvider
				messages={messages[locale]}
				locale={LOCALES[locale]}
				defaultLocale={LOCALES.ENGLISH}
			>
				{children}
			</ReactIntlProvider>
		</IntlContext.Provider>
	);
} 