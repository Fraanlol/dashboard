import React, { useMemo, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { createAppTheme } from './theme'
import { useThemeStore } from '../stores/themeStore'

interface CustomThemeProviderProps {
    children: ReactNode
}

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
    const mode = useThemeStore((state) => state.mode)

    const theme = useMemo(() => createAppTheme(mode), [mode])

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    )
}

export const useThemeMode = () => {
    const mode = useThemeStore((state) => state.mode)
    const toggleTheme = useThemeStore((state) => state.toggleTheme)
    const setTheme = useThemeStore((state) => state.setTheme)

    return { mode, toggleTheme, setTheme }
}
