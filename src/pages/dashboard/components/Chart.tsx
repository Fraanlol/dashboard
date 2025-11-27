import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    TooltipProps,
} from 'recharts'
import { useTheme } from '@mui/material/styles'
import { Paper, Typography, Box, useMediaQuery } from '@mui/material'
import { t } from 'i18next'

type ChartProps = {
    data: Array<{
        day: string
        activeUsers: number
        newUsers: number
    }>
    height?: number
    showGrid?: boolean
}

interface ChartPayloadEntry {
    name: string
    value: number
    color: string
    payload: { day: string; activeUsers: number; newUsers: number }
}

function renderTooltip(props: TooltipProps<number, string>) {
    const { active } = props
    // TooltipProps doesn't expose payload in its type definition, but it exists at runtime
    const payload = (
        props as TooltipProps<number, string> & {
            payload?: ChartPayloadEntry[]
        }
    ).payload
    if (!active || !payload || !payload.length) return null

    return (
        <Paper elevation={3} sx={{ p: 1.5, bgcolor: 'background.paper' }}>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
            >
                {payload[0].payload.day}
            </Typography>
            {payload.map((entry: ChartPayloadEntry, index: number) => (
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

export default function Chart({
    data,
    showGrid = true,
    height = 300,
}: ChartProps) {
    const theme = useTheme()

    const activeUsersColor = theme.palette.primary.main as string
    const newUsersColor = theme.palette.success.main as string

    // Calcular el máximo valor de los datos
    const maxValue = Math.max(
        ...data.map((d) => Math.max(d.activeUsers, d.newUsers))
    )

    // Agregar 20% de padding arriba para que el gráfico tenga espacio
    const yAxisMax = Math.ceil(maxValue * 1.2)

    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
            minHeight={height}
            minWidth={0}
        >
            <LineChart
                data={data}
                margin={{ top: 20, right: 16, left: 0, bottom: 8 }}
            >
                {showGrid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme.palette.divider as string}
                        vertical={false}
                        horizontal={true}
                        opacity={0.15}
                    />
                )}

                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: theme.palette.text.secondary as string,
                        fontSize: 12,
                        fontWeight: 500,
                    }}
                    dy={8}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: theme.palette.text.secondary as string,
                        fontSize: 12,
                        fontWeight: 500,
                    }}
                    dx={-8}
                    domain={[0, yAxisMax]}
                    allowDataOverflow={false}
                />

                <Tooltip
                    content={renderTooltip}
                    cursor={{ strokeDasharray: '3 3' }}
                />

                <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                    formatter={(value) => (
                        <span
                            style={{
                                color: theme.palette.text.primary as string,
                                fontSize: '14px',
                                fontWeight: 500,
                            }}
                        >
                            {value}
                        </span>
                    )}
                />

                <Line
                    type="monotone"
                    dataKey="activeUsers"
                    name={t('dashboard.chart.activeUsers')}
                    stroke={activeUsersColor}
                    strokeWidth={3}
                    dot={{
                        r: 5,
                        fill: activeUsersColor,
                        strokeWidth: 3,
                        stroke: theme.palette.background.paper as string,
                    }}
                    activeDot={{
                        r: 8,
                        fill: activeUsersColor,
                        stroke: theme.palette.background.paper as string,
                        strokeWidth: 3,
                    }}
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                />

                <Line
                    type="monotone"
                    dataKey="newUsers"
                    name={t('dashboard.chart.newUsers')}
                    stroke={newUsersColor}
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{
                        r: 5,
                        fill: newUsersColor,
                        strokeWidth: 3,
                        stroke: theme.palette.background.paper as string,
                    }}
                    activeDot={{
                        r: 8,
                        fill: newUsersColor,
                        stroke: theme.palette.background.paper as string,
                        strokeWidth: 3,
                    }}
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
