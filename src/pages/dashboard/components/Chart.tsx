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
import { Paper, Typography, Box } from '@mui/material'

type ChartProps = {
    data: Array<{
        day: string
        activeUsers: number
        newUsers: number
    }>
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
                {payload[0].payload.day}
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

export default function Chart({
    data,
    showGrid = true,
    height = 300,
}: ChartProps) {
    const theme = useTheme()

    const activeUsersColor = theme.palette.primary.main as string
    const newUsersColor = theme.palette.secondary.main as string

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart
                data={data}
                margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
                {showGrid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme.palette.divider as string}
                        vertical={false}
                    />
                )}

                <XAxis
                    dataKey="day"
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

                <Tooltip content={renderTooltip} />

                <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
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

                <Line
                    type="monotone"
                    dataKey="activeUsers"
                    name="Usuarios activos"
                    stroke={activeUsersColor}
                    strokeWidth={3}
                    dot={{
                        r: 4,
                        fill: activeUsersColor,
                        strokeWidth: 2,
                        stroke: theme.palette.background.paper as string,
                    }}
                    activeDot={{ r: 6 }}
                    animationDuration={800}
                    animationEasing="ease"
                />

                <Line
                    type="monotone"
                    dataKey="newUsers"
                    name="Usuarios nuevos"
                    stroke={newUsersColor}
                    strokeWidth={3}
                    dot={{
                        r: 4,
                        fill: newUsersColor,
                        strokeWidth: 2,
                        stroke: theme.palette.background.paper as string,
                    }}
                    activeDot={{ r: 6 }}
                    animationDuration={800}
                    animationEasing="ease"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
