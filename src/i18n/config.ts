import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const LANG_STORAGE_KEY = 'app_lang'
const LEGACY_I18NEXT_KEY = 'i18nextLng'

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
    // avoid suspense in tests and server-less environments
    react: { useSuspense: false },
})

// load initial language resources and ensure i18n has the language set
;(async () => {
    const ok = await loadLocale(initialLng)
    if (ok) {
        // ensure i18n internal language and cache are consistent
        await i18n.changeLanguage(initialLng)
        try {
            localStorage.setItem(LANG_STORAGE_KEY, initialLng)
            localStorage.setItem(LEGACY_I18NEXT_KEY, initialLng)
        } catch (e) {
            /* ignore storage errors */
        }
    } else if (initialLng !== 'en') {
        // fallback to English if initial load failed
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

// helper to change language and persist choice
export async function changeLanguage(lng: string) {
    const ok = await loadLocale(lng)
    if (ok) {
        await i18n.changeLanguage(lng)
        try {
            // write both keys to remain compatible with other libs/tests
            localStorage.setItem(LANG_STORAGE_KEY, lng)
            localStorage.setItem(LEGACY_I18NEXT_KEY, lng)
        } catch (e) {
            /* ignore */
        }
    }
}

export default i18n
