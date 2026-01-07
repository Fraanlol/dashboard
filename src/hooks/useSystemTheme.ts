import { useEffect } from 'react'
import { useThemeStore } from '../stores/themeStore'

export const useSystemTheme = () => {
    const setTheme = useThemeStore((state) => state.setTheme)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e: MediaQueryListEvent) => {
            const stored = localStorage.getItem('theme-storage')
            if (!stored) {
                setTheme(e.matches ? 'dark' : 'light')
            }
        }

        const stored = localStorage.getItem('theme-storage')
        if (!stored) {
            setTheme(mediaQuery.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [setTheme])
}

export const useSystemThemeSync = () => {
    const setTheme = useThemeStore((state) => state.setTheme)

    const syncWithSystem = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    return { syncWithSystem }
}
