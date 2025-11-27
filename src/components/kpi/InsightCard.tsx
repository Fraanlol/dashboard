import React from 'react'
import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { SxProps, Theme } from '@mui/material'
import { fadeSlideIn, hoverLift } from '@styles/animations'
import { insightCardBase } from '@styles/kpiTokens'

type InsightCardProps = {
    children: React.ReactNode
    index?: number
    hover?: boolean
    sx?: SxProps<Theme>
}

export default function InsightCard({
    children,
    index = 0,
    hover = false,
    sx,
}: InsightCardProps) {
    const theme = useTheme()
    const base = insightCardBase(theme)
    const arr: SxProps<Theme> = [
        base,
        fadeSlideIn(index * 0.05),
        ...(hover ? [hoverLift] : []),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ]

    return <Paper sx={arr}>{children}</Paper>
}
