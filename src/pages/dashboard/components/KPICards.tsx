import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SellIcon from '@mui/icons-material/Sell'
import Typography from '@mui/material/Typography'

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
export default function KPICards() {
    let cards = [
        { title: 'Revenue', value: '1,234' },
        { title: 'Users', value: '567' },
        { title: 'Products', value: '89' },
        { title: 'Orders', value: '2.5%' },
    ]
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
                                        borderBottom: '12px solid transparent',
                                        borderLeft: '8px solid',
                                        borderLeftColor: 'secondary.main',
                                    },
                                }}
                            >
                                +15%
                            </Box>
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
                                    <SellIcon
                                        className="text-white"
                                        focusable={false}
                                        tabIndex={-1}
                                        sx={{ outline: 'none' }}
                                    />
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
                                    Compared to last month
                                </Typography>
                                <p>{'>'}</p>
                            </Grid>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
