import { Box, Chip, Paper, Typography, useTheme } from '@mui/material'
import { useUsersStore } from '@stores/usersStore'

const UsersFilters = () => {
    const theme = useTheme()
    const filters = useUsersStore((state) => state.filters)
    const setFilters = useUsersStore((state) => state.setFilters)

    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'guest', label: 'Guest' },
    ]

    const statuses = [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' },
    ]

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
            }}
        >
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, fontWeight: 600 }}
                >
                    Role
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                        label="All Roles"
                        onClick={() => setFilters({ ...filters, role: null })}
                        color={filters.role === null ? 'primary' : 'default'}
                        variant={filters.role === null ? 'filled' : 'outlined'}
                    />
                    {roles.map((role) => (
                        <Chip
                            key={role.value}
                            label={role.label}
                            onClick={() =>
                                setFilters({ ...filters, role: role.value })
                            }
                            color={
                                filters.role === role.value
                                    ? 'primary'
                                    : 'default'
                            }
                            variant={
                                filters.role === role.value
                                    ? 'filled'
                                    : 'outlined'
                            }
                        />
                    ))}
                </Box>
            </Box>
            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, fontWeight: 600 }}
                >
                    Status
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {statuses.map((status) => (
                        <Chip
                            key={status.value}
                            label={status.label}
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    status: status.value as
                                        | 'all'
                                        | 'active'
                                        | 'inactive'
                                        | 'suspended',
                                })
                            }
                            color={
                                filters.status === status.value
                                    ? 'info'
                                    : 'default'
                            }
                            variant={
                                filters.status === status.value
                                    ? 'filled'
                                    : 'outlined'
                            }
                        />
                    ))}
                </Box>
            </Box>
        </Paper>
    )
}

export default UsersFilters
