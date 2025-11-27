import React from 'react'
import { Paper, Box, Typography, Chip, useTheme } from '@mui/material'
import { Theme } from '@mui/material'
import { SxProps } from '@mui/material'
import { fadeSlideIn, hoverLift, metricPulse } from '@styles/animations'
import { heroCardBase, iconShell, trendChip } from '@styles/kpiTokens'

type HeroCardProps = {
    title: string
    value: React.ReactNode
    subtitle?: string
    chip?: string
    accent: string
    Icon: React.ElementType
    index?: number
    sx?: SxProps<Theme>
}

export default function HeroCard({
    title,
    value,
    subtitle,
    chip,
    accent,
    Icon,
    index = 0,
    sx,
}: HeroCardProps) {
    const theme = useTheme()

    const sxArray: SxProps<Theme> = [
        heroCardBase(theme),
        fadeSlideIn(index * 0.05),
        hoverLift,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ]

    return (
        <Paper sx={sxArray}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 0.5 }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={[
                            metricPulse(0.12 + index * 0.05),
                            { fontWeight: 700, letterSpacing: '-0.02em' },
                        ]}
                    >
                        {value}
                    </Typography>
                    {subtitle ? (
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', mt: 0.5 }}
                        >
                            {subtitle}
                        </Typography>
                    ) : null}
                </Box>
                <Box sx={iconShell(accent)}>
                    <Icon sx={{ fontSize: 36 }} />
                </Box>
            </Box>
            {chip ? (
                <Chip label={chip} size="small" sx={trendChip(accent)} />
            ) : null}
        </Paper>
    )
}
