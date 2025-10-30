import { useEffect } from 'react'
import { useThemeStore } from '../stores/themeStore'

export const useSystemTheme = () => {
    const setTheme = useThemeStore((state) => state.setTheme)

    useEffect(() => {
        // Detectar preferencia del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e: MediaQueryListEvent) => {
            // Solo cambiar si no hay preferencia guardada
            const stored = localStorage.getItem('theme-storage')
            if (!stored) {
                setTheme(e.matches ? 'dark' : 'light')
            }
        }

        // Establecer tema inicial si no hay preferencia guardada
        const stored = localStorage.getItem('theme-storage')
        if (!stored) {
            setTheme(mediaQuery.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [setTheme])
}

// Hook para forzar tema del sistema
export const useSystemThemeSync = () => {
    const setTheme = useThemeStore((state) => state.setTheme)

    const syncWithSystem = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    return { syncWithSystem }
}
