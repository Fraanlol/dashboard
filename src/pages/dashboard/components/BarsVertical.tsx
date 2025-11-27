import { useId, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    TooltipProps,
    LabelList,
} from 'recharts'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Paper, Typography } from '@mui/material'

type BarsDataItem = {
    month: string
    currentYear: number
    previousYear: number
}

type BarsVerticalProps = {
    height?: number
    showGrid?: boolean
    data?: BarsDataItem[]
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

export default function BarsVertical({
    height = 350,
    showGrid = true,
    data = defaultData,
}: BarsVerticalProps) {
    const { t } = useTranslation()
    const theme = useTheme()
    const chartId = useId()
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

    interface PayloadEntry {
        dataKey: string
        name: string
        value: number
        payload: BarsDataItem
    }

    const paletteByKey: Record<string, string> = {
        currentYear: theme.palette.primary.main as string,
        previousYear: alpha(theme.palette.text.primary, 0.4) as string,
    }

    const renderTooltip = (props: TooltipProps<number, string>) => {
        const { active } = props
        const payload = (
            props as TooltipProps<number, string> & { payload?: PayloadEntry[] }
        ).payload
        if (!active || !payload || !payload.length) return null

        const monthData = payload[0].payload as BarsDataItem
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

    const currentGradientId = `${chartId}-current-gradient`
    const previousGradientId = `${chartId}-previous-gradient`

    const renderVerticalLabel = (props: {
        value?: string | number
        x?: string | number
        y?: string | number
        width?: string | number
    }) => {
        const numValue =
            typeof props.value === 'string'
                ? parseFloat(props.value)
                : props.value
        if (typeof numValue !== 'number' || isNaN(numValue)) return null

        const xVal = typeof props.x === 'string' ? parseFloat(props.x) : props.x
        const yVal = typeof props.y === 'string' ? parseFloat(props.y) : props.y
        const widthVal =
            typeof props.width === 'string'
                ? parseFloat(props.width)
                : props.width

        const x = typeof xVal === 'number' && !isNaN(xVal) ? xVal : 0
        const y = typeof yVal === 'number' && !isNaN(yVal) ? yVal : 0
        const width =
            typeof widthVal === 'number' && !isNaN(widthVal) ? widthVal : 0

        return (
            <text
                x={x + width / 2}
                y={y - 8}
                textAnchor="middle"
                fill={theme.palette.text.primary as string}
                style={{ fontSize: 11, fontWeight: 600 }}
            >
                {currencyFormatter.format(numValue)}
            </text>
        )
    }

    const chartContent = (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 12,
                    right: 16,
                    left: 0,
                    bottom: 0,
                }}
                barGap={-14}
                barCategoryGap="38%"
            >
                <defs>
                    <linearGradient
                        id={previousGradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor={alpha(paletteByKey.previousYear, 0.8)}
                        />
                        <stop
                            offset="100%"
                            stopColor={alpha(paletteByKey.previousYear, 0.2)}
                        />
                    </linearGradient>
                    <linearGradient
                        id={currentGradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor={alpha(paletteByKey.currentYear, 1)}
                        />
                        <stop
                            offset="100%"
                            stopColor={alpha(paletteByKey.currentYear, 0.4)}
                        />
                    </linearGradient>
                </defs>

                {showGrid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={alpha(theme.palette.divider, 0.8)}
                        vertical={false}
                        horizontal={true}
                        opacity={0.5}
                    />
                )}

                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: theme.palette.text.secondary as string,
                        fontSize: 12,
                        fontWeight: 600,
                    }}
                    dy={8}
                />

                <YAxis
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
                    dx={-8}
                />

                <Tooltip
                    content={renderTooltip}
                    cursor={{
                        fill: alpha(theme.palette.primary.main, 0.04),
                        radius: 8,
                    }}
                />

                <Bar
                    dataKey="previousYear"
                    name={t('dashboard.bars.series.previous')}
                    fill={alpha(paletteByKey.previousYear, 0.18)}
                    radius={[18, 18, 18, 18]}
                    barSize={46}
                    animationDuration={750}
                    animationEasing="ease-out"
                />

                <Bar
                    dataKey="currentYear"
                    name={t('dashboard.bars.series.current')}
                    fill={`url(#${currentGradientId})`}
                    radius={[14, 14, 14, 14]}
                    barSize={28}
                    animationDuration={900}
                    animationEasing="ease-out"
                >
                    <LabelList
                        dataKey="currentYear"
                        content={renderVerticalLabel}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )

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

            <Box sx={{ flex: 1, minHeight: height }}>{chartContent}</Box>
        </Box>
    )
}
