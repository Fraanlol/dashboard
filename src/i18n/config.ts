import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const LANG_STORAGE_KEY = 'app_lang'
const LEGACY_I18NEXT_KEY = 'i18nextLng'

export async function loadLocale(lng: string) {
    try {
        const imported = await import(`../locales/${lng}/common.json`)
        const resources = (imported &&
            (imported.default || imported)) as Record<string, unknown>

        if (i18n.hasResourceBundle(lng, 'translation')) {
            i18n.removeResourceBundle(lng, 'translation')
        }

        i18n.addResourceBundle(lng, 'translation', resources, true, true)
        return true
    } catch (err) {
        console.error('Failed to load locale', lng, err)
        return false
    }
}

function detectInitialLanguage() {
    const stored =
        typeof window !== 'undefined'
            ? localStorage.getItem(LANG_STORAGE_KEY) ||
              localStorage.getItem(LEGACY_I18NEXT_KEY)
            : null
    if (stored) return stored
    if (typeof navigator !== 'undefined') {
        const nav =
            navigator.language ||
            (navigator.languages && navigator.languages[0])
        if (nav) return nav.split('-')[0]
    }
    return 'en'
}

const initialLng = detectInitialLanguage()

i18n.use(initReactI18next).init({
    lng: initialLng,
    fallbackLng: 'en',
    debug: false,
    resources: {},
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
})
;(async () => {
    const ok = await loadLocale(initialLng)
    if (ok) {
        await i18n.changeLanguage(initialLng)
        try {
            localStorage.setItem(LANG_STORAGE_KEY, initialLng)
            localStorage.setItem(LEGACY_I18NEXT_KEY, initialLng)
        } catch (e) {
            /* ignore */
        }
    } else if (initialLng !== 'en') {
        const fallbackOk = await loadLocale('en')
        if (fallbackOk) {
            await i18n.changeLanguage('en')
            try {
                localStorage.setItem(LANG_STORAGE_KEY, 'en')
                localStorage.setItem(LEGACY_I18NEXT_KEY, 'en')
            } catch (e) {
                /* ignore */
            }
        }
    }
})()

export async function changeLanguage(lng: string) {
    const ok = await loadLocale(lng)
    if (ok) {
        await i18n.changeLanguage(lng)
        try {
            localStorage.setItem(LANG_STORAGE_KEY, lng)
            localStorage.setItem(LEGACY_I18NEXT_KEY, lng)
        } catch (e) {
            /* ignore */
        }
    }
}

export default i18n
