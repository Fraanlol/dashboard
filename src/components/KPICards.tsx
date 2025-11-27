import { Box, Paper, Grid, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import { ReactNode } from 'react'
import { fadeSlideIn, hoverLift, metricPulse } from '@styles/animations'
import { heroCardBase, neutralIconShell, trendChip } from '@styles/kpiTokens'

export interface KPICard {
    title: string
    value: string | number
    icon: ReactNode
    change?: string
    changeLabel?: string
}

interface KPICardsProps {
    cards: KPICard[]
}

export default function KPICards({ cards }: KPICardsProps) {
    const theme = useTheme()
    return (
        <Grid container sx={{ flexGrow: 1, mb: 4 }}>
            <Grid
                container
                size={12}
                sx={{
                    flexWrap: 'wrap',
                }}
                columnSpacing={2}
                rowSpacing={2}
            >
                {cards.map((card, index) => {
                    const changeValue = card.change
                        ? parseFloat(card.change.replace(/[^0-9.-]/g, ''))
                        : 0
                    const isPositive = changeValue >= 0
                    const changeColor = isPositive
                        ? theme.palette.success.main
                        : theme.palette.error.main
                    const TrendIcon = isPositive
                        ? TrendingUpIcon
                        : TrendingDownIcon

                    return (
                        <Grid
                            key={card.title + index}
                            size={{ xs: 6, sm: 6, md: 4, lg: 2 }}
                        >
                            <Paper
                                elevation={0}
                                sx={[
                                    heroCardBase(theme),
                                    fadeSlideIn(index * 0.05),
                                    hoverLift,
                                ]}
                            >
                                {/* Header with Icon and Change */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 1.5,
                                    }}
                                >
                                    <Box sx={neutralIconShell(theme)}>
                                        <Box
                                            sx={{
                                                color: 'text.secondary',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: 20,
                                            }}
                                        >
                                            {card.icon}
                                        </Box>
                                    </Box>

                                    {card.change && (
                                        <Box
                                            sx={trendChip(changeColor)}
                                            className="flex items-center gap-0.5"
                                        >
                                            <TrendIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: changeColor,
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: changeColor,
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {card.change}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                {/* Title */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 0.25,
                                        fontSize: '0.8125rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {card.title}
                                </Typography>

                                {/* Value */}
                                <Typography
                                    variant="h4"
                                    sx={[
                                        metricPulse(0.1 + index * 0.05),
                                        {
                                            fontWeight: 700,
                                            color: 'text.primary',
                                            fontSize: '1.5rem',
                                            letterSpacing: '-0.02em',
                                            mb: 0.5,
                                        },
                                    ]}
                                >
                                    {card.value}
                                </Typography>

                                {/* Bottom Label */}
                                {card.changeLabel && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: '0.6875rem',
                                        }}
                                    >
                                        {card.changeLabel}
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}
