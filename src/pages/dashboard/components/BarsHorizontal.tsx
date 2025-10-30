import { useMemo } from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    Text,
    Legend,
} from 'recharts'
import { useTheme } from '@mui/material/styles'

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

const YAxisLeftTick = ({ y, payload }: any) => {
    return (
        <Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
            {payload.value}
        </Text>
    )
}

let ctx: CanvasRenderingContext2D | null = null

export const measureText14HelveticaNeue = (text: string): number => {
    if (!ctx) {
        const canvas = document.createElement('canvas')
        ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.font = "14px 'Helvetica Neue'"
        }
    }

    return ctx ? ctx.measureText(text).width : 0
}

const BAR_AXIS_SPACE = 10

export default function BarsHorizontal() {
    const theme = useTheme()

    const currentYearColor = theme.palette.primary.main as string
    const previousYearColor = `${theme.palette.primary.main}80`

    const maxTextWidth = useMemo(() => {
        return data.reduce((acc, cur) => {
            const maxValue = Math.max(cur.currentYear, cur.previousYear)
            const width = measureText14HelveticaNeue(maxValue.toLocaleString())
            if (width > acc) {
                return width
            }
            return acc
        }, 0)
    }, [])

    return (
        <ResponsiveContainer
            width="100%"
            height={50 * data.length}
            debounce={50}
        >
            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    left: 10,
                    right: maxTextWidth + (BAR_AXIS_SPACE - 8),
                }}
            >
                <XAxis hide axisLine={false} type="number" />
                <YAxis
                    yAxisId={0}
                    dataKey="month"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={YAxisLeftTick}
                />
                <YAxis
                    orientation="right"
                    yAxisId={1}
                    dataKey="currentYear"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => value.toLocaleString()}
                    mirror
                    tick={{
                        transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`,
                    }}
                />

                <Legend
                    wrapperStyle={{
                        paddingTop: '20px',
                        width: '100%',
                        left: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    iconType="rect"
                    iconSize={14}
                    formatter={(value) => (
                        <span
                            style={{
                                color: theme.palette.text.primary as string,
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '100px',
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
                    minPointSize={2}
                    barSize={16}
                    radius={[0, 4, 4, 0]}
                />
                <Bar
                    dataKey="currentYear"
                    name="Año actual"
                    fill={currentYearColor}
                    className="mr-12"
                    minPointSize={2}
                    barSize={16}
                    radius={[0, 4, 4, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
