import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    TooltipProps,
    ResponsiveContainer,
} from 'recharts'
import { Paper, Typography, Box, Grid, Stack, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

interface DonutPayloadEntry {
    name: string
    value: number
}

function renderTooltip(props: TooltipProps<number, string>) {
    const { active } = props
    const payload = (
        props as TooltipProps<number, string> & {
            payload?: DonutPayloadEntry[]
        }
    ).payload
    if (!active || !payload || !payload.length) return null
    const point = payload[0]
    return (
        <Paper elevation={3} sx={{ p: 1, bgcolor: 'background.paper' }}>
            <Typography variant="caption" color="text.secondary">
                {point.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {point.value}
            </Typography>
        </Paper>
    )
}

export default function Donut() {
    const { t } = useTranslation()
    const theme = useTheme()

    const data = [
        { name: t('dashboard.donut.revenue'), value: 400 },
        { name: t('dashboard.donut.users'), value: 300 },
        { name: t('dashboard.donut.orders'), value: 300 },
        { name: t('dashboard.donut.products'), value: 200 },
    ]
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#F44236']

    // Calcular total y porcentajes
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
            }}
        >
            {/* Chart Section */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '60%',
                    minHeight: 300,
                }}
            >
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minWidth={0}
                    minHeight={0}
                >
                    <PieChart
                        style={{
                            outline: 'none',
                        }}
                    >
                        <Pie
                            data={data}
                            dataKey="value"
                            label={false}
                            labelLine={false}
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="90%"
                            fill="#82ca9d"
                            isAnimationActive={false}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index]}
                                    style={{
                                        outline: 'none',
                                        cursor: 'default',
                                    }}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={renderTooltip} />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Total */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            lineHeight: 1,
                        }}
                    >
                        {total}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                        }}
                    >
                        Total
                    </Typography>
                </Box>
            </Box>

            {/* Modern Legend */}
            <Stack spacing={1.5} sx={{ width: '100%', maxWidth: '360px' }}>
                {data.map((entry, index) => {
                    const percentage = ((entry.value / total) * 100).toFixed(1)
                    return (
                        <Paper
                            key={`label-${index}`}
                            elevation={0}
                            sx={{
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 2,
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: COLORS[index],
                                    bgcolor: 'action.hover',
                                    transform: 'translateX(4px)',
                                },
                            }}
                        >
                            {/* Color indicator */}
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    bgcolor: COLORS[index],
                                    borderRadius: 1,
                                    flexShrink: 0,
                                    boxShadow: `0 0 0 3px ${COLORS[index]}20`,
                                }}
                            />

                            {/* Category name */}
                            <Typography
                                variant="body2"
                                sx={{
                                    flexGrow: 1,
                                    fontWeight: 500,
                                    color: 'text.primary',
                                }}
                            >
                                {entry.name}
                            </Typography>

                            {/* Value and percentage */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'text.primary',
                                    }}
                                >
                                    {entry.value}
                                </Typography>
                                <Chip
                                    label={`${percentage}%`}
                                    size="small"
                                    sx={{
                                        height: 22,
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        bgcolor: `${COLORS[index]}15`,
                                        color: COLORS[index],
                                        border: `1px solid ${COLORS[index]}30`,
                                    }}
                                />
                            </Box>
                        </Paper>
                    )
                })}
            </Stack>
        </Box>
    )
}
