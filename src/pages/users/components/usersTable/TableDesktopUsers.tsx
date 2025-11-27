import {
    Alert,
    Avatar,
    Box,
    Chip,
    Button,
    IconButton,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { useUsersStore, User } from '@stores/usersStore'
import { useUserModalStore } from '@stores/userModalStore'
import { useDeleteUserDialogStore } from '@stores/userModalStore'
import { useTranslation } from 'react-i18next'

function TableDesktopUsers({
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
    const theme = useTheme()
    const { t } = useTranslation()
    const setSorting = useUsersStore((state) => state.setSorting)
    const sortField = useUsersStore((state) => state.sortField)
    const sortOrder = useUsersStore((state) => state.sortOrder)
    const openEditModal = useUserModalStore((state) => state.openEditModal)
    const openDeleteDialog = useDeleteUserDialogStore(
        (state) => state.openDeleteDialog
    )

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
            color: theme.palette.text.secondary,
            soft: alpha(theme.palette.text.secondary, 0.1),
        }

    const actionButtonStyles = {
        border: '1px solid',
        borderRadius: 2,
        transition: 'all 0.2s ease',
    } as const

    // Loading state
    if (isLoading) {
        return (
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    mb: 3,
                }}
            >
                <Table sx={{ tableLayout: 'fixed', minWidth: 900 }}>
                    <colgroup>
                        <col style={{ width: '80px' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: 'auto' }} />
                        <col style={{ width: '130px' }} />
                        <col style={{ width: '160px' }} />
                    </colgroup>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor:
                                    theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.05)'
                                        : 'rgba(0, 0, 0, 0.02)',
                            }}
                        >
                            <TableCell sx={{ fontWeight: 600 }}>
                                {t('users.table.avatar')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                                {t('users.table.name')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                                {t('users.table.email')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                                {t('users.table.role')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                                {t('users.table.actions')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <TableRow key={row}>
                                <TableCell>
                                    <Skeleton
                                        variant="circular"
                                        width={40}
                                        height={40}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width="80%" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width="90%" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton
                                        variant="rounded"
                                        width={80}
                                        height={24}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                overflowX: 'auto',
                mb: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 'none',
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor:
                        theme.palette.mode === 'dark' ? '#111827' : '#f3f4f6',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor:
                        theme.palette.mode === 'dark' ? '#374151' : '#94a3b8',
                    borderRadius: '999px',
                },
            }}
        >
            <Table sx={{ tableLayout: 'fixed', minWidth: 900 }}>
                <colgroup>
                    <col style={{ width: '80px' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: '130px' }} />
                    <col style={{ width: '160px' }} />
                </colgroup>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.05
                            ),
                            backdropFilter: 'blur(6px)',
                        }}
                    >
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: 12,
                                letterSpacing: '0.08em',
                            }}
                        >
                            {t('users.table.avatar')}
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: 12,
                                letterSpacing: '0.08em',
                            }}
                        >
                            <TableSortLabel
                                active={sortField === 'firstName'}
                                direction={
                                    sortField === 'firstName' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('firstName')}
                            >
                                {t('users.table.name')}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: 12,
                                letterSpacing: '0.08em',
                            }}
                        >
                            <TableSortLabel
                                active={sortField === 'email'}
                                direction={
                                    sortField === 'email' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('email')}
                            >
                                {t('users.table.email')}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: 12,
                                letterSpacing: '0.08em',
                            }}
                        >
                            <TableSortLabel
                                active={sortField === 'role'}
                                direction={
                                    sortField === 'role' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('role')}
                            >
                                {t('users.table.role')}
                            </TableSortLabel>
                        </TableCell>

                        <TableCell
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: 12,
                                letterSpacing: '0.08em',
                            }}
                        >
                            {t('users.table.actions')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => {
                        const fullName =
                            `${user.firstName} ${user.lastName ?? ''}`.trim()
                        const roleToken = getRoleToken(user.role)
                        return (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            0.04
                                        ),
                                    },
                                }}
                            >
                                <TableCell>
                                    <Avatar
                                        src={user.image}
                                        alt={user.firstName}
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            border: `2px solid ${alpha(
                                                theme.palette.primary.main,
                                                0.2
                                            )}`,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 600, mb: 0.25 }}
                                    >
                                        {fullName || user.firstName}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        ID #{user.id}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            px: 1.5,
                                            py: 0.75,
                                            borderRadius: 2,
                                            border: '1px solid',
                                            borderColor: alpha(
                                                theme.palette.divider,
                                                0.7
                                            ),
                                            backgroundColor: alpha(
                                                theme.palette.background
                                                    .default,
                                                0.8
                                            ),
                                            width: 'fit-content',
                                        }}
                                    >
                                        <EmailOutlinedIcon
                                            sx={{
                                                fontSize: 18,
                                                color: 'text.secondary',
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 500 }}
                                        >
                                            {user.email}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={roleToken.label}
                                        size="small"
                                        sx={{
                                            fontWeight: 700,
                                            letterSpacing: '-0.02em',
                                            color: roleToken.color,
                                            backgroundColor: roleToken.soft,
                                            borderRadius: 2,
                                        }}
                                    />
                                </TableCell>

                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Tooltip title={t('users.table.view')}>
                                            <IconButton
                                                size="small"
                                                color="info"
                                                sx={{
                                                    ...actionButtonStyles,
                                                    borderColor: alpha(
                                                        theme.palette.info.main,
                                                        0.6
                                                    ),
                                                    color: theme.palette.info
                                                        .main,
                                                    '&:hover': {
                                                        bgcolor: alpha(
                                                            theme.palette.info
                                                                .main,
                                                            0.12
                                                        ),
                                                    },
                                                }}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={t('users.table.edit')}>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    openEditModal({
                                                        id: user.id,
                                                        firstName:
                                                            user.firstName,
                                                        lastName:
                                                            user.lastName || '',
                                                        email: user.email,
                                                        age: user.age || 18,
                                                        gender:
                                                            user.gender ||
                                                            'male',
                                                        role: user.role,
                                                        image: user.image,
                                                    })
                                                }
                                                sx={{
                                                    ...actionButtonStyles,
                                                    borderColor: alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.6
                                                    ),
                                                    color: theme.palette.primary
                                                        .main,
                                                    '&:hover': {
                                                        bgcolor: alpha(
                                                            theme.palette
                                                                .primary.main,
                                                            0.12
                                                        ),
                                                    },
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip
                                            title={t('users.table.delete')}
                                        >
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    openDeleteDialog({
                                                        id: user.id,
                                                        name: `${user.firstName} ${user.lastName}`,
                                                    })
                                                }
                                                sx={{
                                                    ...actionButtonStyles,
                                                    borderColor: alpha(
                                                        theme.palette.error
                                                            .main,
                                                        0.5
                                                    ),
                                                    color: theme.palette.error
                                                        .main,
                                                    '&:hover': {
                                                        bgcolor: alpha(
                                                            theme.palette.error
                                                                .main,
                                                            0.12
                                                        ),
                                                    },
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableDesktopUsers
