import { createTheme, Theme } from '@mui/material/styles'

// --- Palettes
const lightPalette = {
    mode: 'light',
    primary: {
        main: '#2563EB',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#64748B',
        contrastText: '#ffffff',
    },
    error: {
        main: '#EF4444',
        contrastText: '#ffffff',
    },
    warning: {
        main: '#FACC15',
        contrastText: '#000000',
    },
    info: {
        main: '#06B6D4',
        contrastText: '#000000',
    },
    success: {
        main: '#22C55E',
        contrastText: '#ffffff',
    },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    text: {
        primary: '#0F172A',
        secondary: '#475569',
        disabled: 'rgba(15,23,42,0.38)',
        cards: 'rgba(255,255,255,.5)',
        chart: '#0000005e',
    },
    divider: '#E2E8F0',
}

const darkPalette = {
    mode: 'dark',
    primary: {
        main: '#3B82F6',
        contrastText: '#000000',
    },
    secondary: {
        main: '#94A3B8',
        contrastText: '#000000',
    },
    error: {
        main: '#F87171',
        contrastText: '#000000',
    },
    warning: {
        main: '#FDE047',
        contrastText: '#000000',
    },
    info: {
        main: '#22D3EE',
        contrastText: '#000000',
    },
    success: {
        main: '#4ADE80',
        contrastText: '#000000',
    },
    background: { default: '#0F172A', paper: '#1E293B' },
    text: {
        primary: '#F8FAFC',
        secondary: '#CBD5E1',
        disabled: 'rgba(248,250,252,0.6)',
        cards: '#F8FAFC',
    },
    divider: '#334155',
}

// --- Typography
const typography = {
    fontFamily: [
        'Manrope',
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    sm: { fontSize: '0.875rem' },
    md: { fontSize: '1rem' },
    lg: { fontSize: '1.25rem' },
}

// -- Radius
const shape = {
    borderRadius: 10,
}

// --- Component overrides (minimal)
const components = {
    MuiButton: {
        styleOverrides: {
            root: { borderRadius: 8, textTransform: 'none' as const },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: { borderRadius: 12 },
        },
    },
}

// Factory to create theme by mode
export const createAppTheme = (mode: 'light' | 'dark'): Theme => {
    const pal = mode === 'dark' ? darkPalette : lightPalette
    return createTheme({
        palette: { ...pal, mode },
        shape: { ...shape },
        typography: { ...typography },
        spacing: 8,
        components,
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    })
}

// default theme (light)
const defaultTheme = createAppTheme('light')
export default defaultTheme
