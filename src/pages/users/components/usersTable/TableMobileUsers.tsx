import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SortIcon from '@mui/icons-material/Sort'
import CheckIcon from '@mui/icons-material/Check'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import EmailIcon from '@mui/icons-material/Email'
import { useUsersStore, User, SortFieldType } from '@stores/usersStore'
import { useUserModalStore } from '@stores/userModalStore'
import { useDeleteUserDialogStore } from '@stores/userModalStore'

function TableMobileUsers({
    users,
    isLoading,
    isError,
    refetch,
}: {
    users: User[]
    isLoading: boolean
    isError: boolean
    refetch: () => void
}) {
    const sortField = useUsersStore((state) => state.sortField)
    const sortOrder = useUsersStore((state) => state.sortOrder)
    const setSorting = useUsersStore((state) => state.setSorting)
    const openEditModal = useUserModalStore((state) => state.openEditModal)
    const openDeleteDialog = useDeleteUserDialogStore(
        (state) => state.openDeleteDialog
    )

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const { t } = useTranslation()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSort = (field: SortFieldType) => {
        setSorting(field)
        handleClose()
    }

    const roleTokens: Record<
        string,
        { label: string; color: string; soft: string }
    > = {
        admin: {
            label: t('users.roles.admin'),
            color: '#be185d',
            soft: 'rgba(244,114,182,0.15)',
        },
        moderator: {
            label: t('users.roles.moderator'),
            color: '#f97316',
            soft: 'rgba(251,146,60,0.15)',
        },
        user: {
            label: t('users.roles.user'),
            color: '#2563eb',
            soft: 'rgba(96,165,250,0.15)',
        },
    }

    const getRoleToken = (role: string) =>
        roleTokens[role] ?? {
            label: role,
            color: '#475569',
            soft: alpha('#475569', 0.1),
        }

    const sortOptions = [
        { field: 'firstName' as SortFieldType, label: t('users.table.name') },
        { field: 'email' as SortFieldType, label: t('users.table.email') },
        { field: 'role' as SortFieldType, label: t('users.table.role') },
    ]

    const getSortLabel = () => {
        if (!sortField) return t('users.table.sortBy')
        const option = sortOptions.find((opt) => opt.field === sortField)
        const orderIcon = sortOrder === 'asc' ? '↑' : '↓'
        return `${option?.label} ${orderIcon}`
    }

    // Loading skeleton
    if (isLoading) {
        return (
            <Stack spacing={2} sx={{ px: { xs: 0, sm: 0 }, pb: 2 }}>
                {[1, 2, 3].map((item) => (
                    <Card key={item}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <Skeleton
                                    variant="circular"
                                    width={64}
                                    height={64}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton
                                        variant="text"
                                        width="60%"
                                        height={32}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={80}
                                        height={24}
                                        sx={{ mt: 1 }}
                                    />
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Skeleton variant="text" width="80%" height={24} />
                            <Divider sx={{ my: 2 }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        )
    }

    // Error state
    if (isError) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Alert
                    severity="error"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            startIcon={<RefreshIcon />}
                            onClick={() => refetch()}
                        >
                            {t('common.retry')}
                        </Button>
                    }
                >
                    {t('users.table.errorLoad')}
                </Alert>
            </Box>
        )
    }

    // Empty state
    if (users.length === 0) {
        return (
            <Alert severity="info" sx={{ mt: 2 }}>
                {t('users.table.noUsers')}
            </Alert>
        )
    }

    return (
        <>
            {/* Sort Button - Sticky */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    bgcolor: 'background.default',
                    pb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {t('users.list.count', { count: users.length })}
                </Typography>

                <Button
                    variant={sortField ? 'contained' : 'outlined'}
                    size="small"
                    startIcon={<SortIcon />}
                    endIcon={
                        sortField ? (
                            sortOrder === 'asc' ? (
                                <ArrowUpwardIcon fontSize="small" />
                            ) : (
                                <ArrowDownwardIcon fontSize="small" />
                            )
                        ) : null
                    }
                    onClick={handleClick}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: sortField
                            ? '0 8px 20px rgba(99,102,241,0.25)'
                            : 'none',
                    }}
                >
                    {getSortLabel()}
                </Button>
            </Box>

            {/* Sort Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200,
                        borderRadius: 2,
                    },
                }}
            >
                <MenuItem
                    onClick={() => handleSort(null)}
                    selected={!sortField}
                >
                    <ListItemIcon>
                        {!sortField && <CheckIcon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText>{t('common.default')}</ListItemText>
                </MenuItem>
                <Divider />
                {sortOptions.map((option) => (
                    <MenuItem
                        key={option.field}
                        onClick={() => handleSort(option.field)}
                        selected={sortField === option.field}
                    >
                        <ListItemIcon>
                            {sortField === option.field && (
                                <CheckIcon fontSize="small" />
                            )}
                        </ListItemIcon>
                        <ListItemText>{option.label}</ListItemText>
                        {sortField === option.field && (
                            <ListItemIcon sx={{ ml: 2 }}>
                                {sortOrder === 'asc' ? (
                                    <ArrowUpwardIcon fontSize="small" />
                                ) : (
                                    <ArrowDownwardIcon fontSize="small" />
                                )}
                            </ListItemIcon>
                        )}
                    </MenuItem>
                ))}
            </Menu>

            {/* Cards Stack */}
            <Stack spacing={2} sx={{ px: { xs: 0, sm: 0 }, pb: 2 }}>
                {users.map((user) => (
                    <Card
                        key={user.id}
                        sx={{
                            overflow: 'visible',
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: alpha('#312e81', 0.1),
                            background:
                                'linear-gradient(145deg, rgba(15,23,42,0.02) 0%, rgba(79,70,229,0.06) 50%, rgba(236,72,153,0.04) 100%)',
                            '&:hover': {
                                boxShadow: 6,
                                transform: 'translateY(-4px)',
                                transition: 'all 0.3s ease',
                            },
                        }}
                    >
                        <CardContent sx={{ p: 2.5 }}>
                            {/* Header: Avatar + Name + Role */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                <Avatar
                                    src={user.image}
                                    alt={user.firstName}
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        flexShrink: 0,
                                    }}
                                />

                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            mb: 0.75,
                                        }}
                                    >
                                        {user.firstName}
                                    </Typography>
                                    {(() => {
                                        const token = getRoleToken(user.role)
                                        return (
                                            <Chip
                                                label={token.label}
                                                size="small"
                                                sx={{
                                                    height: 24,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    color: token.color,
                                                    backgroundColor: token.soft,
                                                    borderRadius: 2,
                                                }}
                                            />
                                        )
                                    })()}
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Email */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    mb: 2,
                                }}
                            >
                                <EmailIcon
                                    color="action"
                                    sx={{ fontSize: '1.2rem' }}
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {user.email}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Actions */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <IconButton
                                    size="medium"
                                    color="info"
                                    sx={{
                                        border: '1px solid',
                                        borderColor: alpha('#0ea5e9', 0.6),
                                        borderRadius: 2,
                                        color: '#0ea5e9',
                                        '&:hover': {
                                            bgcolor: alpha('#0ea5e9', 0.15),
                                        },
                                    }}
                                >
                                    <VisibilityIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="medium"
                                    color="primary"
                                    onClick={() =>
                                        openEditModal({
                                            id: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName || '',
                                            email: user.email,
                                            age: user.age || 18,
                                            gender: user.gender || 'male',
                                            role: user.role,
                                            image: user.image,
                                        })
                                    }
                                    sx={{
                                        border: '1px solid',
                                        borderColor: alpha('#2563eb', 0.6),
                                        borderRadius: 2,
                                        color: '#2563eb',
                                        '&:hover': {
                                            bgcolor: alpha('#2563eb', 0.15),
                                        },
                                    }}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="medium"
                                    color="error"
                                    onClick={() =>
                                        openDeleteDialog({
                                            id: user.id,
                                            name: `${user.firstName} ${user.lastName}`,
                                        })
                                    }
                                    sx={{
                                        border: '1px solid',
                                        borderColor: alpha('#dc2626', 0.6),
                                        borderRadius: 2,
                                        color: '#dc2626',
                                        '&:hover': {
                                            bgcolor: alpha('#dc2626', 0.15),
                                        },
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </>
    )
}

export default TableMobileUsers
