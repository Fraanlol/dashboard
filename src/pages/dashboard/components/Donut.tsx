import { PieChart, Pie, Cell, Tooltip, TooltipProps } from 'recharts'
import { Paper, Typography, Box, Grid } from '@mui/material'

const data = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 300 },
    { name: 'Category D', value: 200 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#F44236']

function renderTooltip(props: TooltipProps<any, any>) {
    const { active } = props as any
    const payload = (props as any).payload
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
    return (
        <>
            <PieChart
                style={{
                    width: '100%',
                    maxWidth: '300px',
                    maxHeight: '80vh',
                    aspectRatio: 1,
                }}
            >
                <Pie
                    data={data}
                    dataKey="value"
                    label={false}
                    labelLine={false}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#82ca9d"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip content={renderTooltip} />
            </PieChart>
            <Grid container spacing={1} sx={{ mt: 2 }}>
                {data.map((entry, index) => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 6 }}
                        key={`label-${index}`}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                bgcolor: COLORS[index % COLORS.length],
                                borderRadius: 0.5,
                                boxShadow: 1,
                            }}
                        />
                        <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ flexGrow: 1 }}
                        >
                            {entry.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 700 }}
                        >
                            {entry.value}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
