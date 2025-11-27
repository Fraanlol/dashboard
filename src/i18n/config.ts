import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const LANG_STORAGE_KEY = 'app_lang'

// Lazy-load locale JSON files using dynamic import
export async function loadLocale(lng: string) {
    try {
        const imported = await import(`../locales/${lng}/common.json`)
        const resources = (imported &&
            (imported.default || imported)) as Record<string, unknown>

        // Remove existing bundle first to prevent resource accumulation
        if (i18n.hasResourceBundle(lng, 'translation')) {
            i18n.removeResourceBundle(lng, 'translation')
        }

        // register under default namespace 'translation'
        i18n.addResourceBundle(lng, 'translation', resources, true, true)
        return true
    } catch (err) {
        console.error('Failed to load locale', lng, err)
        return false
    }
}

function detectInitialLanguage() {
    // Preference order: localStorage -> navigator -> fallback 'en'
    const stored =
        typeof window !== 'undefined'
            ? localStorage.getItem(LANG_STORAGE_KEY)
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
    react: { useSuspense: true },
})

// load initial language resources asynchronously (fire-and-forget)
loadLocale(initialLng).then(() => {
    // nothing else required; resources are added to i18n
})

// helper to change language and persist choice
export async function changeLanguage(lng: string) {
    const ok = await loadLocale(lng)
    if (ok) {
        await i18n.changeLanguage(lng)
        try {
            localStorage.setItem(LANG_STORAGE_KEY, lng)
        } catch (e) {
            /* ignore */
        }
    }
}

export default i18n
