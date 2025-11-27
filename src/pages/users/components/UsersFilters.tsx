import { Box, Chip, Paper, Typography, useTheme, Divider } from '@mui/material'
import { alpha } from '@mui/material/styles'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { useUsersStore } from '@stores/usersStore'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

const UsersFilters = () => {
    const theme = useTheme()
    const filters = useUsersStore((state) => state.filters)
    const setFilters = useUsersStore((state) => state.setFilters)
    const { t } = useTranslation()

    const roles = useMemo(
        () => [
            {
                value: null,
                label: t('users.filters.allRoles'),
                accent: '#312e81',
            },
            {
                value: 'admin',
                label: t('users.filters.adminOnly'),
                accent: '#be185d',
            },
            {
                value: 'moderator',
                label: t('users.filters.moderators'),
                accent: '#f59e0b',
            },
            {
                value: 'user',
                label: t('users.filters.contributors'),
                accent: '#2563eb',
            },
        ],
        [t]
    )

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    gap: 2,
                    mb: 2.5,
                }}
            >
                <Box>
                    <Typography
                        variant="overline"
                        sx={{ color: 'text.secondary' }}
                    >
                        {t('users.filters.title')}
                    </Typography>
                </Box>
                <Chip
                    icon={<FilterAltOutlinedIcon />}
                    label={
                        filters.role
                            ? t('users.filters.currentFilter', {
                                  role: filters.role,
                              })
                            : t('users.filters.allRoles')
                    }
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.08
                        ),
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                    }}
                />
            </Box>

            <Divider sx={{ mb: 2, opacity: 0.5 }} />

            <Box sx={{ position: 'relative' }}>
                <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, fontWeight: 600 }}
                >
                    {t('users.filters.roleFocus')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {roles.map((role) => {
                        const isActive = filters.role === role.value
                        const accent = alpha(role.accent, 0.15)
                        return (
                            <Chip
                                key={role.label}
                                label={role.label}
                                onClick={() =>
                                    setFilters({ ...filters, role: role.value })
                                }
                                sx={{
                                    borderRadius: 2,
                                    px: 1.75,
                                    fontWeight: 600,
                                    letterSpacing: '-0.01em',
                                    border: '1px solid',
                                    borderColor: isActive
                                        ? role.accent
                                        : alpha(role.accent, 0.4),
                                    backgroundColor: isActive
                                        ? accent
                                        : 'transparent',
                                    color: isActive
                                        ? role.accent
                                        : theme.palette.text.secondary,
                                    '&:hover': {
                                        backgroundColor: accent,
                                        color: role.accent,
                                    },
                                }}
                            />
                        )
                    })}
                </Box>
            </Box>
        </Paper>
    )
}

export default UsersFilters
