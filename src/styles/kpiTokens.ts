import { alpha } from '@mui/material/styles'
import { SxProps, Theme } from '@mui/material'

export const heroCardBase = (theme: Theme) =>
    ({
        p: 3,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
    }) satisfies SxProps<Theme>

export const quickStatCard = (theme: Theme) =>
    ({
        p: 2.25,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
        height: '100%',
    }) satisfies SxProps<Theme>

export const insightCardBase = (theme: Theme) =>
    ({
        ...heroCardBase(theme),
        p: 3,
    }) satisfies SxProps<Theme>

export const iconShell = (accent: string) =>
    ({
        p: 1.5,
        borderRadius: 2,
        backgroundColor: alpha(accent, 0.12),
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }) satisfies SxProps<Theme>

export const quickIconShell = (accent: string) =>
    ({
        width: 44,
        height: 44,
        borderRadius: 2,
        backgroundColor: alpha(accent, 0.12),
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }) satisfies SxProps<Theme>

export const trendChip = (accent: string) =>
    ({
        fontWeight: 600,
        color: accent,
        alignSelf: 'flex-start',
    }) satisfies SxProps<Theme>

export const neutralIconShell = (theme: Theme) =>
    ({
        p: 0.75,
        borderRadius: 1.5,
        backgroundColor: theme.palette.action.hover,
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.secondary,
    }) satisfies SxProps<Theme>
