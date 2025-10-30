import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    textAlign: 'center',
    color:
        (theme.vars ?? theme).palette.text.cards ??
        (theme.vars ?? theme).palette.text.primary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}))

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
    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid
                        key={card.title}
                        size={{ xs: 12, sm: 6, md: 6, lg: 3 }}
                    >
                        <Item
                            sx={{
                                backgroundColor: 'primary.light',
                                position: 'relative',
                            }}
                        >
                            {card.change && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 0,
                                        backgroundColor: 'secondary.main',
                                        color: 'secondary.contrastText',
                                        px: 1,
                                        py: 0.5,
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        width: 80,
                                        clipPath:
                                            'polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%)',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            right: -4,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            width: 0,
                                            height: 0,
                                            borderTop: '12px solid transparent',
                                            borderBottom:
                                                '12px solid transparent',
                                            borderLeft: '8px solid',
                                            borderLeftColor: 'secondary.main',
                                        },
                                    }}
                                >
                                    {card.change}
                                </Box>
                            )}
                            {/* Inside card */}
                            <Grid
                                container
                                flexDirection="row"
                                className="mb-4"
                            >
                                <Item
                                    elevation={0}
                                    className="p-2 mr-4"
                                    sx={{
                                        backgroundColor:
                                            'rgb(255 255 255 / 15%)',
                                        width: 58,
                                        height: 58,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        className="text-white"
                                        sx={{
                                            outline: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {card.icon}
                                    </Box>
                                </Item>
                                <Grid
                                    container
                                    alignItems="flex-start"
                                    flexDirection="column"
                                >
                                    <h3 className="uppercase font-bold text-md mb-1">
                                        {card.title}
                                    </h3>
                                    <Typography
                                        component="p"
                                        sx={{ color: 'primary.contrastText' }}
                                        className="font-bold text-2xl"
                                    >
                                        {card.value}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {card.changeLabel && (
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    sx={{ color: 'primary.contrastText' }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'text.cards',
                                            fontSize: 'sm.fontSize',
                                        }}
                                        className=" font-bold"
                                    >
                                        {card.changeLabel}
                                    </Typography>
                                    <p>{'>'}</p>
                                </Grid>
                            )}
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
