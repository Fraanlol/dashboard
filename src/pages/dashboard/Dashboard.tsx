import MainLayout from '@layout/mainLayout'
import KPICards from '@components/KPICards'
import { Paper, Box, useMediaQuery, useTheme } from '@mui/material'
import Donut from './components/Donut'
import { Grid } from '@mui/material'
import BarsVertical from './components/BarsVertical'
import BarsHorizontal from './components/BarsHorizontal'
import TopProducts from './components/TopProducts'
import Chart from './components/Chart'
import Activity from './components/Activity'
import Transactions from './components/Transactions'
import SellIcon from '@mui/icons-material/Sell'
import PeopleIcon from '@mui/icons-material/People'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default function Dashboard() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const kpiData = [
        { 
            title: 'Revenue', 
            value: '1,234',
            icon: <SellIcon />,
            change: '+15%',
            changeLabel: 'Compared to last month'
        },
        { 
            title: 'Users', 
            value: '567',
            icon: <PeopleIcon />,
            change: '+8%',
            changeLabel: 'Compared to last month'
        },
        { 
            title: 'Products', 
            value: '89',
            icon: <Inventory2Icon />,
            change: '+3%',
            changeLabel: 'Compared to last month'
        },
        { 
            title: 'Orders', 
            value: '2.5%',
            icon: <ShoppingCartIcon />,
            change: '+12%',
            changeLabel: 'Compared to last month'
        },
    ]

    return (
        <MainLayout>
            <div className="mb-4 text-gray-600">
                <h1 className="fade-in font-bold text-xl">Dashboard</h1>
                <p className="fade-in text-sm">Welcome to lorem dashboard.</p>
            </div>
            <section>
                <KPICards cards={kpiData} />
                <Paper
                    elevation={1}
                    sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}
                >
                    <Box sx={{ width: '100%' }} tabIndex={-1}>
                        <Grid
                            container
                            direction={{ xs: 'column', lg: 'row' }}
                            alignItems={'space-between'}
                        >
                            <Grid
                                container
                                direction={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <div className=" text-gray-600 mb-12">
                                    <h2 className="fade-in font-bold text-lg">
                                        Monthly income
                                    </h2>
                                </div>

                                {isMobile ? (
                                    <BarsHorizontal />
                                ) : (
                                    <BarsVertical />
                                )}
                            </Grid>
                            <div className="separator mb-12"></div>
                            <Grid
                                container
                                direction={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <div className=" text-gray-600">
                                    <h2 className="fade-in font-bold text-lg">
                                        Income source
                                    </h2>
                                </div>
                                <Donut />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </section>
            <section className="mt-4">
                <Grid
                    container
                    direction={{ xs: 'column', sm: 'row-reverse' }}
                    alignItems="stretch"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                        }}
                        className="flex-1"
                    >
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <div className=" text-gray-600 mb-12 flex-1">
                                <h2 className="fade-in font-bold text-lg">
                                    Monthly income
                                </h2>
                            </div>
                            <TopProducts />
                        </Grid>
                    </Paper>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                        }}
                        className="flex-2"
                    >
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <div className=" text-gray-600 mb-12">
                                <h2 className="fade-in font-bold text-lg">
                                    User Activitiy
                                </h2>
                            </div>
                            <Chart
                                data={[
                                    {
                                        day: 'Lun',
                                        activeUsers: 400,
                                        newUsers: 240,
                                    },
                                    {
                                        day: 'Mar',
                                        activeUsers: 300,
                                        newUsers: 139,
                                    },
                                    {
                                        day: 'Mié',
                                        activeUsers: 200,
                                        newUsers: 980,
                                    },
                                    {
                                        day: 'Jue',
                                        activeUsers: 278,
                                        newUsers: 390,
                                    },
                                    {
                                        day: 'Vie',
                                        activeUsers: 189,
                                        newUsers: 480,
                                    },
                                    {
                                        day: 'Sáb',
                                        activeUsers: 239,
                                        newUsers: 380,
                                    },
                                    {
                                        day: 'Dom',
                                        activeUsers: 349,
                                        newUsers: 430,
                                    },
                                ]}
                            />
                        </Grid>
                    </Paper>
                </Grid>
            </section>
            <section className="mt-4">
                <Grid
                    container
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="stretch"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Paper
                            elevation={1}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Activity />
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Paper
                            elevation={1}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                height: '100%',
                            }}
                        >
                            <Transactions />
                        </Paper>
                    </Grid>
                </Grid>
            </section>
        </MainLayout>
    )
}
