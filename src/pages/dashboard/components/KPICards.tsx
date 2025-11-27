import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import React from 'react'

interface KPICardData {
    title: string
    value: string
    icon: React.ReactNode
    change: string
    changeLabel: string
}

interface KPICardsProps {
    cards: KPICardData[]
}

export default function KPICards({ cards }: KPICardsProps) {
    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <Grid container spacing={3}>
                {cards.map((card, index) => {
                    const changeValue = parseFloat(card.change)
                    const isPositive = changeValue >= 0
                    const changeColor = isPositive
                        ? 'success.main'
                        : 'error.main'
                    const TrendIcon = isPositive
                        ? TrendingUpIcon
                        : TrendingDownIcon

                    return (
                        <Grid
                            key={`kpi-card-${index}`}
                            size={{ xs: 12, sm: 6, md: 6, lg: 3 }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow:
                                            '0 4px 12px 0 rgb(0 0 0 / 0.05)',
                                    },
                                }}
                            >
                                {/* Header with Icon and Change */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: 2,
                                            backgroundColor: 'action.hover',
                                            display: 'flex',
                                        }}
                                    >
                                        {card.icon}
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            backgroundColor: isPositive
                                                ? 'rgba(16, 185, 129, 0.1)'
                                                : 'rgba(220, 38, 38, 0.1)',
                                        }}
                                    >
                                        <TrendIcon
                                            sx={{
                                                fontSize: 16,
                                                color: changeColor,
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: changeColor,
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            {card.change}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Title */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 0.5,
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {card.title}
                                </Typography>

                                {/* Value */}
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        fontSize: '2rem',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {card.value}
                                </Typography>

                                {/* Bottom Label */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        mt: 1,
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {card.changeLabel}
                                </Typography>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
