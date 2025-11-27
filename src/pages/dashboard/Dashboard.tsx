import MainLayout from '@layout/mainLayout'
import KPICards from '@components/KPICards'
import { Box, useMediaQuery, useTheme, Grid } from '@mui/material'
import Donut from './components/Donut'
import BarsVertical from './components/BarsVertical'
import BarsHorizontal from './components/BarsHorizontal'
import TopProducts from './components/TopProducts'
import Chart from './components/Chart'
import Activity from './components/Activity'
import Transactions from './components/Transactions'
import DashboardCard from './components/DashboardCard'
import SellIcon from '@mui/icons-material/Sell'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { fadeSlideIn } from '@styles/animations'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export default function Dashboard() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation()

    const kpiData = useMemo(
        () => [
            {
                title: t('dashboard.kpi.revenue'),
                value: '$45,231',
                icon: (
                    <SellIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                ),
                change: '+12.5%',
                changeLabel: t('dashboard.kpi.vsLastMonth'),
            },
            {
                title: t('dashboard.kpi.users'),
                value: '2,543',
                icon: (
                    <PeopleIcon
                        sx={{ fontSize: 24, color: 'text.secondary' }}
                    />
                ),
                change: '+8.2%',
                changeLabel: t('dashboard.kpi.vsLastMonth'),
            },
            {
                title: t('dashboard.kpi.orders'),
                value: '1,423',
                icon: (
                    <ShoppingCartIcon
                        sx={{ fontSize: 24, color: 'text.secondary' }}
                    />
                ),
                change: '+15.3%',
                changeLabel: t('dashboard.kpi.vsLastMonth'),
            },
            {
                title: t('dashboard.kpi.products'),
                value: '489',
                icon: (
                    <Inventory2Icon
                        sx={{ fontSize: 24, color: 'text.secondary' }}
                    />
                ),
                change: '-3.1%',
                changeLabel: t('dashboard.kpi.vsLastMonth'),
            },
            {
                title: t('dashboard.kpi.conversion'),
                value: '3.24%',
                icon: (
                    <TrendingUpIcon
                        sx={{ fontSize: 24, color: 'text.secondary' }}
                    />
                ),
                change: '+0.8%',
                changeLabel: t('dashboard.kpi.vsLastMonth'),
            },
            {
                title: t('dashboard.kpi.pageViews'),
                value: '24.5K',
                icon: (
                    <VisibilityIcon
                        sx={{ fontSize: 24, color: 'text.secondary' }}
                    />
                ),
                change: '+22.1%',
                changeLabel: t('dashboard.kpi.vsLastMonth'),
            },
        ],
        [t]
    )

    const chartData = useMemo(
        () => [
            {
                day: t('dashboard.days.monShort'),
                activeUsers: 820,
                newUsers: 240,
            },
            {
                day: t('dashboard.days.tueShort'),
                activeUsers: 750,
                newUsers: 180,
            },
            {
                day: t('dashboard.days.wedShort'),
                activeUsers: 1150,
                newUsers: 320,
            },
            {
                day: t('dashboard.days.thuShort'),
                activeUsers: 890,
                newUsers: 210,
            },
            {
                day: t('dashboard.days.friShort'),
                activeUsers: 980,
                newUsers: 280,
            },
            {
                day: t('dashboard.days.satShort'),
                activeUsers: 720,
                newUsers: 150,
            },
            {
                day: t('dashboard.days.sunShort'),
                activeUsers: 1050,
                newUsers: 380,
            },
        ],
        [t]
    )

    const barsData = useMemo(
        () => [
            {
                month: t('dashboard.bars.months.jan'),
                currentYear: 4000,
                previousYear: 2400,
            },
            {
                month: t('dashboard.bars.months.feb'),
                currentYear: 3000,
                previousYear: 1398,
            },
            {
                month: t('dashboard.bars.months.mar'),
                currentYear: 2000,
                previousYear: 1800,
            },
            {
                month: t('dashboard.bars.months.apr'),
                currentYear: 2780,
                previousYear: 3908,
            },
            {
                month: t('dashboard.bars.months.may'),
                currentYear: 1890,
                previousYear: 4800,
            },
            {
                month: t('dashboard.bars.months.jun'),
                currentYear: 2390,
                previousYear: 3800,
            },
            {
                month: t('dashboard.bars.months.jul'),
                currentYear: 3490,
                previousYear: 4300,
            },
            {
                month: t('dashboard.bars.months.aug'),
                currentYear: 4000,
                previousYear: 2400,
            },
            {
                month: t('dashboard.bars.months.sep'),
                currentYear: 3000,
                previousYear: 1398,
            },
            {
                month: t('dashboard.bars.months.oct'),
                currentYear: 2000,
                previousYear: 1800,
            },
            {
                month: t('dashboard.bars.months.nov'),
                currentYear: 2780,
                previousYear: 3908,
            },
            {
                month: t('dashboard.bars.months.dec'),
                currentYear: 1890,
                previousYear: 4800,
            },
        ],
        [t]
    )

    return (
        <MainLayout>
            {/* Header */}
            <Box className="mb-4 text-gray-600" sx={fadeSlideIn()}>
                <h1 className="fade-in font-bold text-xl">
                    {t('dashboard.title')}
                </h1>
                <p className="fade-in text-sm">{t('dashboard.subtitle')}</p>
            </Box>

            {/* KPI Cards */}
            <Box sx={{ mb: 3 }}>
                <KPICards cards={kpiData} />
            </Box>

            {/* Main Grid Layout */}
            <Grid container spacing={3}>
                {/* Row 1: Monthly Income & Income Source */}
                <Grid
                    size={{ xs: 12, lg: 9 }}
                    sx={[fadeSlideIn(0.05), { minHeight: 400 }]}
                >
                    <DashboardCard
                        title={t('dashboard.cards.monthlyIncome')}
                        height="100%"
                    >
                        {isMobile ? (
                            <BarsHorizontal data={barsData} />
                        ) : (
                            <BarsVertical data={barsData} />
                        )}
                    </DashboardCard>
                </Grid>

                <Grid
                    size={{ xs: 12, lg: 3 }}
                    sx={[fadeSlideIn(0.08), { minHeight: 400 }]}
                >
                    <DashboardCard
                        title={t('dashboard.cards.incomeSource')}
                        height="100%"
                    >
                        <Donut />
                    </DashboardCard>
                </Grid>

                {/* Row 2: Top Products & User Activity Chart */}
                <Grid
                    size={{ xs: 12, md: 6, lg: 4 }}
                    sx={[fadeSlideIn(0.12), { minHeight: 400 }]}
                >
                    <DashboardCard
                        title={t('dashboard.cards.topProducts')}
                        height="100%"
                    >
                        <TopProducts />
                    </DashboardCard>
                </Grid>

                <Grid
                    size={{ xs: 12, md: 6, lg: 8 }}
                    sx={[fadeSlideIn(0.15), { minHeight: 400 }]}
                >
                    <DashboardCard
                        title={t('dashboard.cards.userActivity')}
                        height="100%"
                    >
                        <Chart data={chartData} />
                    </DashboardCard>
                </Grid>

                {/* Row 3: Recent Activity & Recent Transactions */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={[fadeSlideIn(0.18), { minHeight: 400 }]}
                >
                    <DashboardCard height="100%">
                        <Activity />
                    </DashboardCard>
                </Grid>

                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={[fadeSlideIn(0.21), { minHeight: 400 }]}
                >
                    <DashboardCard height="100%">
                        <Transactions />
                    </DashboardCard>
                </Grid>
            </Grid>
        </MainLayout>
    )
}
