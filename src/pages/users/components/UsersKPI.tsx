import { Box, Paper, Typography, useTheme } from '@mui/material'
import { useUsersStore } from '@stores/usersStore'
import { useMemo } from 'react'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { User } from '@stores/usersStore'

const UsersKPI = ({
    users,
    isLoading,
}: {
    users: User[]
    isLoading: boolean
}) => {
    const theme = useTheme()

    const stats = useMemo(() => {
        if (isLoading)
            return { totalUsers: 0, activeUsers: 0, newUsers: 0, adminUsers: 0 }
        const totalUsers = users.length
        const activeUsers = '999' // Placeholder for active users count
        const adminUsers = users.filter((user) => user.role === 'admin').length
        const newUsers = 999

        return { totalUsers, activeUsers, newUsers, adminUsers }
    }, [isLoading, users])

    const cards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: PeopleIcon,
            color: theme.palette.info.main,
            bgColor:
                theme.palette.mode === 'dark'
                    ? 'rgba(33, 150, 243, 0.1)'
                    : 'rgba(33, 150, 243, 0.08)',
        },
        {
            title: 'Active Users',
            value: stats.activeUsers,
            icon: CheckCircleIcon,
            color: theme.palette.success.main,
            bgColor:
                theme.palette.mode === 'dark'
                    ? 'rgba(76, 175, 80, 0.1)'
                    : 'rgba(76, 175, 80, 0.08)',
        },
        {
            title: 'New This Month',
            value: stats.newUsers,
            icon: PersonAddIcon,
            color: '#00acc1', // Cyan
            bgColor:
                theme.palette.mode === 'dark'
                    ? 'rgba(0, 172, 193, 0.1)'
                    : 'rgba(0, 172, 193, 0.08)',
        },
        {
            title: 'Administrators',
            value: stats.adminUsers,
            icon: AdminPanelSettingsIcon,
            color: '#5e35b1', // Deep purple
            bgColor:
                theme.palette.mode === 'dark'
                    ? 'rgba(94, 53, 177, 0.1)'
                    : 'rgba(94, 53, 177, 0.08)',
        },
    ]

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                },
                gap: 3,
                mb: 4,
            }}
        >
            {cards.map((card) => {
                const Icon = card.icon
                return (
                    <Paper
                        key={card.title}
                        elevation={0}
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            backgroundColor: card.bgColor,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow:
                                    theme.palette.mode === 'dark'
                                        ? `0 8px 24px ${card.color}20`
                                        : `0 8px 24px ${card.color}15`,
                                borderColor: card.color,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    backgroundColor: card.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icon sx={{ color: '#fff', fontSize: 28 }} />
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.primary,
                                    mb: 0.5,
                                }}
                            >
                                {card.value}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: 500,
                                }}
                            >
                                {card.title}
                            </Typography>
                        </Box>
                    </Paper>
                )
            })}
        </Box>
    )
}

export default UsersKPI
