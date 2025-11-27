import { Box, Typography, useTheme, Grid, LinearProgress } from '@mui/material'
import { alpha, Theme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import PeopleIcon from '@mui/icons-material/People'
import CakeIcon from '@mui/icons-material/Cake'
import WcIcon from '@mui/icons-material/Wc'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import { User } from '@stores/usersStore'
import { fadeSlideIn, hoverLift, metricPulse } from '@styles/animations'
import {
    heroCardBase,
    iconShell,
    insightCardBase,
    quickIconShell,
    quickStatCard,
    trendChip,
} from '@styles/kpiTokens'
import HeroCard from '@components/kpi/HeroCard'
import QuickStat from '@components/kpi/QuickStat'
import InsightCard from '@components/kpi/InsightCard'
import { TFunction } from 'i18next'

type UserHeroCardConfig = {
    title: string
    value: string
    subtitle: string
    chip: string
    accent: string
    Icon: typeof PeopleIcon
}

type UserQuickStatConfig = {
    title: string
    value: string
    detail: string
    accent: string
    Icon: typeof CakeIcon
}

const buildUserHeroCards = (
    stats: ReturnType<typeof getUserStats>,
    theme: Theme,
    t: TFunction<'translation', undefined>
): UserHeroCardConfig[] => [
    {
        title: t('users.kpi.activeDirectory'),
        value: stats.totalUsers,
        subtitle: t('users.kpi.activeDirectorySubtitle'),
        chip: t('users.kpi.activeDirectoryChip'),
        accent: theme.palette.primary.main,
        Icon: PeopleIcon,
    },
    {
        title: t('users.kpi.adminCoverage'),
        value: stats.adminUsers,
        subtitle: t('users.kpi.adminCoverageSubtitle', {
            percent: stats.adminCoverage,
        }),
        chip: t('users.kpi.adminCoverageChip'),
        accent: theme.palette.secondary.main,
        Icon: AdminPanelSettingsIcon,
    },
]

const buildUserQuickStats = (
    stats: ReturnType<typeof getUserStats>,
    theme: Theme,
    t: TFunction<'translation', undefined>
): UserQuickStatConfig[] => [
    {
        title: t('users.kpi.averageAge'),
        value: stats.averageAge,
        detail: t('users.kpi.averageAgeDetail'),
        accent: theme.palette.info.main,
        Icon: CakeIcon,
    },
    {
        title: t('users.kpi.maleUsers'),
        value: `${stats.malePercentage}%`,
        detail: t('users.kpi.maleUsersDetail'),
        accent: theme.palette.success.main,
        Icon: WcIcon,
    },
    {
        title: t('users.kpi.femaleUsers'),
        value: `${stats.femalePercentage}%`,
        detail: t('users.kpi.femaleUsersDetail'),
        accent: theme.palette.error.main,
        Icon: Diversity3Icon,
    },
    {
        title: t('users.kpi.securityLeads'),
        value: stats.adminUsers,
        detail: t('users.kpi.securityLeadsDetail'),
        accent: theme.palette.warning.main,
        Icon: EmojiEventsIcon,
    },
]

const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US').format(value)

const getUserStats = (users: User[], isLoading: boolean) => {
    if (isLoading || users.length === 0) {
        return {
            totalUsers: '0',
            totalUsersRaw: 0,
            averageAge: '—',
            malePercentage: 0,
            femalePercentage: 0,
            adminUsers: '0',
            adminUsersRaw: 0,
            adminCoverage: 0,
        }
    }

    const totalUsers = users.length
    const totalAge = users.reduce((sum, user) => sum + (user.age || 0), 0)
    const averageAgeValue = Math.round(totalAge / totalUsers)
    const averageAge = `${averageAgeValue} yrs`

    const maleCount = users.filter((user) => user.gender === 'male').length
    const malePercentage = Math.round((maleCount / totalUsers) * 100)
    const femalePercentage = Math.max(0, 100 - malePercentage)

    const adminUsersCount = users.filter((user) => user.role === 'admin').length
    const adminCoverage = Math.round((adminUsersCount / totalUsers) * 100)

    return {
        totalUsers: formatNumber(totalUsers),
        totalUsersRaw: totalUsers,
        averageAge,
        malePercentage,
        femalePercentage,
        adminUsers: formatNumber(adminUsersCount),
        adminUsersRaw: adminUsersCount,
        adminCoverage,
    }
}

const UsersKPI = ({
    users,
    isLoading,
}: {
    users: User[]
    isLoading: boolean
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const stats = useMemo(
        () => getUserStats(users, isLoading),
        [users, isLoading]
    )
    const heroCards = useMemo(
        () => buildUserHeroCards(stats, theme, t),
        [stats, theme, t]
    )
    const quickStats = useMemo(
        () => buildUserQuickStats(stats, theme, t),
        [stats, theme, t]
    )

    return (
        <Grid container spacing={2} sx={{ mb: 4 }}>
            {heroCards.map((card, index) => (
                <Grid key={card.title + index} size={{ xs: 12, md: 6 }}>
                    <HeroCard
                        title={card.title}
                        value={card.value}
                        subtitle={card.subtitle}
                        chip={card.chip}
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
                        {t('users.kpi.genderDistribution')}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {t('users.kpi.genderDistributionValue', {
                            male: stats.malePercentage,
                            female: stats.femalePercentage,
                        })}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={stats.malePercentage}
                        sx={{
                            height: 10,
                            borderRadius: 999,
                            backgroundColor: alpha('#ec4899', 0.2),
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 999,
                                backgroundColor: '#0ea5e9',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('users.kpi.maleUsers')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {stats.malePercentage}%
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('users.kpi.femaleUsers')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {stats.femalePercentage}%
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('users.kpi.totalProfiles')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {stats.totalUsers}
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
                                {t('users.kpi.peopleOps')}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                {t('users.kpi.communityPulse')}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                {t('users.kpi.communityPulseDescription')}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.08
                                ),
                                borderRadius: 2,
                                width: 56,
                                height: 56,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: theme.palette.primary.main,
                            }}
                        >
                            <PeopleIcon />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2.5,
                            flexWrap: 'wrap',
                            mt: 3,
                        }}
                    >
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('users.kpi.adminCoverage')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {stats.adminCoverage}%
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('users.roles.admin')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {stats.adminUsers}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('users.kpi.contributors')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {formatNumber(
                                    Math.max(
                                        stats.totalUsersRaw -
                                            stats.adminUsersRaw,
                                        0
                                    )
                                )}
                            </Typography>
                        </Box>
                    </Box>
                </InsightCard>
            </Grid>
        </Grid>
    )
}

export default UsersKPI
