import React from 'react'
import { Paper, Box, Typography, useTheme } from '@mui/material'
import { Theme } from '@mui/material'
import { SxProps } from '@mui/material'
import { fadeSlideIn, hoverLift, metricPulse } from '@styles/animations'
import { quickStatCard, quickIconShell } from '@styles/kpiTokens'

type QuickStatProps = {
    title: string
    value: React.ReactNode
    detail?: string
    accent: string
    Icon: React.ElementType
    index?: number
    sx?: SxProps<Theme>
}

export default function QuickStat({
    title,
    value,
    detail,
    accent,
    Icon,
    index = 0,
    sx,
}: QuickStatProps) {
    const theme = useTheme()
    const sxArray: SxProps<Theme> = [
        quickStatCard(theme),
        fadeSlideIn(0.15 + index * 0.05),
        hoverLift,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ]

    return (
        <Paper sx={sxArray}>
            <Box sx={quickIconShell(accent)}>
                <Icon />
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {title}
            </Typography>
            <Typography variant="h4" sx={metricPulse(0.2 + index * 0.05)}>
                {value}
            </Typography>
            {detail ? (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {detail}
                </Typography>
            ) : null}
        </Paper>
    )
}
