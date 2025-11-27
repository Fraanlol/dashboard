import { useId, useMemo } from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    TooltipProps,
    LabelList,
} from 'recharts'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type BarsDataItem = {
    month: string
    currentYear: number
    previousYear: number
}

const defaultData: BarsDataItem[] = [
    { month: 'Ene', currentYear: 4000, previousYear: 2400 },
    { month: 'Feb', currentYear: 3000, previousYear: 1398 },
    { month: 'Mar', currentYear: 2000, previousYear: 3000 },
    { month: 'Abr', currentYear: 2780, previousYear: 3908 },
    { month: 'May', currentYear: 1890, previousYear: 4800 },
    { month: 'Jun', currentYear: 2390, previousYear: 3800 },
    { month: 'Jul', currentYear: 3490, previousYear: 4300 },
    { month: 'Ago', currentYear: 4000, previousYear: 2400 },
    { month: 'Sep', currentYear: 3000, previousYear: 1398 },
    { month: 'Oct', currentYear: 2000, previousYear: 3000 },
    { month: 'Nov', currentYear: 2780, previousYear: 3908 },
    { month: 'Dic', currentYear: 1890, previousYear: 4800 },
]

type BarsHorizontalProps = {
    data?: BarsDataItem[]
}

export default function BarsHorizontal({
    data = defaultData,
}: BarsHorizontalProps) {
    const theme = useTheme()
    const chartId = useId()
    const { t } = useTranslation()

    const currencyFormatter = useMemo(
        () =>
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }),
        []
    )

    const compactFormatter = useMemo(
        () =>
            new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short',
                maximumFractionDigits: 1,
            }),
        []
    )

    const paletteByKey: Record<string, string> = {
        currentYear: theme.palette.primary.main as string,
        previousYear: alpha(theme.palette.text.primary, 0.4) as string,
    }

    interface PayloadEntry {
        dataKey: string
        name: string
        value: number
        payload: BarsDataItem
    }

    const renderTooltip = (props: TooltipProps<number, string>) => {
        const { active } = props
        const payload = (
            props as TooltipProps<number, string> & { payload?: PayloadEntry[] }
        ).payload
        if (!active || !payload || !payload.length) return null

        const monthData = payload[0].payload as (typeof data)[number]
        const delta = monthData.currentYear - monthData.previousYear
        const deltaPct = monthData.previousYear
            ? (delta / monthData.previousYear) * 100
            : 0

        return (
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 1 }}
                >
                    {monthData.month}
                </Typography>
                {payload.map((entry) => (
                    <Box
                        key={entry.dataKey}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 3,
                            mb: 0.5,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor:
                                        paletteByKey[entry.dataKey] ||
                                        theme.palette.text.secondary,
                                }}
                            />
                            {entry.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {currencyFormatter.format(entry.value)}
                        </Typography>
                    </Box>
                ))}
                <Typography
                    variant="caption"
                    color={delta >= 0 ? 'success.main' : 'error.main'}
                    sx={{ fontWeight: 600 }}
                >
                    {delta >= 0 ? '+' : ''}
                    {currencyFormatter.format(delta)} ({deltaPct.toFixed(1)}%)
                    {t('dashboard.bars.vsPreviousYear')}
                </Typography>
            </Paper>
        )
    }

    const legendItems = [
        {
            label: t('dashboard.bars.series.current'),
            color: paletteByKey.currentYear,
        },
        {
            label: t('dashboard.bars.series.previous'),
            color: paletteByKey.previousYear,
        },
    ]

    const currentGradientId = `${chartId}-current-horizontal`
    const previousGradientId = `${chartId}-previous-horizontal`

    const renderHorizontalLabel = (props: any) => {
        const numValue =
            typeof props.value === 'string'
                ? parseFloat(props.value)
                : props.value
        if (typeof numValue !== 'number' || isNaN(numValue)) return null
        const x = typeof props.x === 'number' ? props.x : 0
        const y = typeof props.y === 'number' ? props.y : 0
        const width = typeof props.width === 'number' ? props.width : 0
        const height = typeof props.height === 'number' ? props.height : 0

        return (
            <text
                x={x + width + 12}
                y={y + height / 2}
                dominantBaseline="middle"
                fill={theme.palette.text.primary as string}
                style={{ fontSize: 11, fontWeight: 600 }}
            >
                {currencyFormatter.format(numValue)}
            </text>
        )
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    mb: 2,
                }}
            >
                {legendItems.map((item) => (
                    <Box
                        key={item.label}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                background: item.color,
                            }}
                        />
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontWeight: 600 }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ flex: 1, minHeight: data.length * 48 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 8, right: 72, left: 4, bottom: 8 }}
                        barGap={-12}
                        barCategoryGap="48%"
                    >
                        <defs>
                            <linearGradient
                                id={previousGradientId}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={alpha(
                                        paletteByKey.previousYear,
                                        0.2
                                    )}
                                />
                                <stop
                                    offset="100%"
                                    stopColor={alpha(
                                        paletteByKey.previousYear,
                                        0.6
                                    )}
                                />
                            </linearGradient>
                            <linearGradient
                                id={currentGradientId}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={alpha(
                                        paletteByKey.currentYear,
                                        0.4
                                    )}
                                />
                                <stop
                                    offset="100%"
                                    stopColor={alpha(
                                        paletteByKey.currentYear,
                                        1
                                    )}
                                />
                            </linearGradient>
                        </defs>

                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: theme.palette.text.secondary as string,
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                            tickFormatter={(value) =>
                                compactFormatter.format(value as number)
                            }
                        />
                        <YAxis
                            dataKey="month"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: theme.palette.text.secondary as string,
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                        />

                        <Tooltip
                            content={renderTooltip}
                            cursor={{
                                fill: alpha(theme.palette.primary.main, 0.04),
                            }}
                        />

                        <Bar
                            dataKey="previousYear"
                            name={t('dashboard.bars.series.previous')}
                            fill={alpha(paletteByKey.previousYear, 0.18)}
                            radius={[20, 20, 20, 20]}
                            barSize={34}
                            animationDuration={750}
                            animationEasing="ease-out"
                        />
                        <Bar
                            dataKey="currentYear"
                            name={t('dashboard.bars.series.current')}
                            fill={`url(#${currentGradientId})`}
                            radius={[16, 16, 16, 16]}
                            barSize={20}
                            animationDuration={900}
                            animationEasing="ease-out"
                        >
                            <LabelList
                                dataKey="currentYear"
                                content={renderHorizontalLabel}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    )
}
