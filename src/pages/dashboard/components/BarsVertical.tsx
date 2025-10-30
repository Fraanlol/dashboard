import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    TooltipProps,
} from 'recharts'
import { useTheme } from '@mui/material/styles'
import { Paper, Typography } from '@mui/material'

type BarsDataItem = {
    month: string
    currentYear: number
    previousYear: number
}

type BarsVerticalProps = {
    height?: number
    showGrid?: boolean
}

function renderTooltip(props: TooltipProps<any, any>) {
    const { active } = props as any
    const payload = (props as any).payload
    if (!active || !payload || !payload.length) return null

    return (
        <Paper elevation={3} sx={{ p: 1.5, bgcolor: 'background.paper' }}>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
            >
                {payload[0].payload.month}
            </Typography>
            {payload.map((entry: any, index: number) => (
                <Typography
                    key={index}
                    variant="body2"
                    sx={{ fontWeight: 600, color: entry.color }}
                >
                    {entry.name}: {entry.value}
                </Typography>
            ))}
        </Paper>
    )
}

const data = [
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
}: BarsVerticalProps) {
    const theme = useTheme()

    const currentYearColor = theme.palette.primary.main as string
    const previousYearColor = `${theme.palette.primary.main}80`

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                data={data}
                margin={{
                    top: 8,
                    right: 16,
                    left: 0,
                    bottom: 8,
                }}
                barGap={2}
                barCategoryGap="20%"
            >
                {showGrid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme.palette.divider as string}
                        vertical={false}
                    />
                )}

                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: theme.palette.text.secondary as string,
                        fontSize: 12,
                    }}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: theme.palette.text.secondary as string,
                        fontSize: 12,
                    }}
                />

                <Tooltip
                    content={renderTooltip}
                    cursor={{
                        fill: theme.palette.action?.hover || 'rgba(0,0,0,0.04)',
                    }}
                />

                <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                    formatter={(value) => (
                        <span
                            style={{
                                color: theme.palette.text.primary as string,
                                fontSize: '14px',
                            }}
                        >
                            {value}
                        </span>
                    )}
                />

                <Bar
                    dataKey="previousYear"
                    name="Año anterior"
                    fill={previousYearColor}
                    radius={[4, 4, 0, 0]}
                    animationDuration={800}
                    animationEasing="ease"
                />

                <Bar
                    dataKey="currentYear"
                    name="Año actual"
                    fill={currentYearColor}
                    radius={[4, 4, 0, 0]}
                    animationDuration={800}
                    animationEasing="ease"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
