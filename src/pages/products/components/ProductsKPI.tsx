import { Grid, Box, Typography, useTheme, LinearProgress } from '@mui/material'
import { alpha, Theme } from '@mui/material/styles'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import CategoryIcon from '@mui/icons-material/Category'
import WarningIcon from '@mui/icons-material/Warning'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { fadeSlideIn, hoverLift, metricPulse } from '@styles/animations'
import HeroCard from '@components/kpi/HeroCard'
import QuickStat from '@components/kpi/QuickStat'
import InsightCard from '@components/kpi/InsightCard'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'

type HeroCardConfig = {
    title: string
    value: string
    subtitle: string
    changeLabel: string
    accent: string
    Icon: typeof Inventory2Icon
}

type QuickStatConfig = {
    title: string
    value: string
    detail: string
    accent: string
    Icon: typeof CategoryIcon
}

const buildHeroCards = (t: TFunction, theme: Theme): HeroCardConfig[] => [
    {
        title: t('products.kpi.totalProducts'),
        value: '1,234',
        subtitle: t('products.kpi.totalProductsSubtitle'),
        changeLabel: t('products.kpi.totalProductsChange'),
        accent: theme.palette.primary.main,
        Icon: Inventory2Icon,
    },
    {
        title: t('products.kpi.catalogValue'),
        value: '$45.2K',
        subtitle: t('products.kpi.catalogValueSubtitle'),
        changeLabel: t('products.kpi.catalogValueChange'),
        accent: theme.palette.success.main,
        Icon: AttachMoneyIcon,
    },
]

const buildQuickStats = (t: TFunction, theme: Theme): QuickStatConfig[] => [
    {
        title: t('products.kpi.categories'),
        value: '12',
        detail: t('products.kpi.categoriesDetail'),
        accent: theme.palette.info.main,
        Icon: CategoryIcon,
    },
    {
        title: t('products.kpi.lowStockAlerts'),
        value: '23',
        detail: t('products.kpi.lowStockDetail'),
        accent: theme.palette.warning.main,
        Icon: WarningIcon,
    },
    {
        title: t('products.kpi.newArrivals'),
        value: '58',
        detail: t('products.kpi.newArrivalsDetail'),
        accent: theme.palette.success.main,
        Icon: AddShoppingCartIcon,
    },
    {
        title: t('products.kpi.topRatedLine'),
        value: '4.9★',
        detail: t('products.kpi.topRatedDetail'),
        accent: theme.palette.secondary.main,
        Icon: StarRateRoundedIcon,
    },
]

export default function ProductsKPI() {
    const theme = useTheme()
    const { t } = useTranslation()
    const heroCards = buildHeroCards(t, theme)
    const quickStats = buildQuickStats(t, theme)

    return (
        <Grid container spacing={2} sx={{ mb: 4 }}>
            {heroCards.map((card, index) => (
                <Grid key={card.title + index} size={{ xs: 12, md: 6 }}>
                    <HeroCard
                        title={card.title}
                        value={card.value}
                        subtitle={card.subtitle}
                        chip={card.changeLabel}
                        accent={card.accent}
                        Icon={card.Icon}
                        index={index}
                    />
                </Grid>
            ))}

            {quickStats.map((stat, index) => (
                <Grid key={stat.title + index} size={{ xs: 12, sm: 6, md: 3 }}>
                    <QuickStat
                        title={stat.title}
                        value={stat.value}
                        detail={stat.detail}
                        accent={stat.accent}
                        Icon={stat.Icon}
                        index={index}
                    />
                </Grid>
            ))}

            <Grid size={{ xs: 12, md: 6 }} sx={fadeSlideIn(0.25)}>
                <InsightCard index={0}>
                    <Typography variant="subtitle2" color="text.secondary">
                        {t('products.kpi.inventoryHealth')}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {t('products.kpi.readyToShip', { percent: 92 })}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={92}
                        sx={{ height: 8, borderRadius: 999 }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3,
                            flexWrap: 'wrap',
                            mt: 1,
                        }}
                    >
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('products.kpi.shippedThisWeek')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {t('products.kpi.shippedCount', { count: 892 })}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('products.kpi.backorderRisk')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {t('products.kpi.backorderCount', {
                                    count: 12,
                                })}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('products.kpi.avgFulfillment')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {t('products.kpi.avgFulfillmentDays', {
                                    days: '1.4',
                                })}
                            </Typography>
                        </Box>
                    </Box>
                </InsightCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={fadeSlideIn(0.3)}>
                <InsightCard index={1} hover>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                {t('products.kpi.launchSpotlight')}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                {t('products.kpi.urbanCommuter')}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                {t('products.kpi.liftSinceRollout')}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.08
                                ),
                                color: theme.palette.primary.main,
                            }}
                        >
                            <LocalShippingIcon />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('products.kpi.sellThrough')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {t('products.kpi.sellThroughValue', {
                                    value: '74%',
                                })}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('products.kpi.contribution')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {t('products.kpi.contributionValue', {
                                    value: '$12.4K',
                                })}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('products.kpi.returnRate')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {t('products.kpi.returnRateValue', {
                                    value: '2.1%',
                                })}
                            </Typography>
                        </Box>
                    </Box>
                </InsightCard>
            </Grid>
        </Grid>
    )
}
