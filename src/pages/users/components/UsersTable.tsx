import {
    Avatar,
    Box,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    useTheme,
} from '@mui/material'
import { useUsersStore, User } from '@stores/usersStore'
import { useMemo, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import VisibilityIcon from '@mui/icons-material/Visibility'

const UsersTable = ({
    users,
    isLoading,
    isError,
}: {
    users: User[]
    isLoading: boolean
    isError: boolean
}) => {
    const theme = useTheme()
    const searchQuery = useUsersStore((state) => state.searchQuery)
    const filters = useUsersStore((state) => state.filters)
    const currentPage = useUsersStore((state) => state.currentPage)
    const rowsPerPage = useUsersStore((state) => state.rowsPerPage)
    const setSorting = useUsersStore((state) => state.setSorting)
    const sortField = useUsersStore((state) => state.sortField)
    const sortOrder = useUsersStore((state) => state.sortOrder)

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'error'
            case 'user':
                return 'primary'
            case 'moderator':
                return 'warning'
            default:
                return 'default'
        }
    }

    const generateStatus = (
        name: string
    ): 'active' | 'inactive' | 'suspended' => {
        const firstChar = name.charAt(0).toLowerCase()

        if (firstChar >= 'a' && firstChar <= 'h') {
            return 'active'
        } else if (firstChar >= 'i' && firstChar <= 'r') {
            return 'inactive'
        } else {
            return 'suspended'
        }
    }

    const getStatusChip = (status: 'active' | 'inactive' | 'suspended') => {
        switch (status) {
            case 'active':
                return (
                    <Chip
                        label="ACTIVE"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                )
            case 'inactive':
                return (
                    <Chip
                        label="INACTIVE"
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                )
            case 'suspended':
                return (
                    <Chip
                        label="SUSPENDED"
                        color="error"
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                )
            default:
                return (
                    <Chip
                        label="UNKNOWN"
                        color="default"
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                )
        }
    }

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflowX: 'auto',
                mb: 3,
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor:
                        theme.palette.mode === 'dark' ? '#1a1a1a' : '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor:
                        theme.palette.mode === 'dark' ? '#555' : '#888',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor:
                            theme.palette.mode === 'dark' ? '#777' : '#555',
                    },
                },
            }}
        >
            <Table sx={{ minWidth: 800 }}>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor:
                                theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(0, 0, 0, 0.02)',
                        }}
                    >
                        <TableCell sx={{ fontWeight: 600 }}>Avatar</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                            <TableSortLabel
                                active={sortField === 'name'}
                                direction={
                                    sortField === 'name' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('name')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                            <TableSortLabel
                                active={sortField === 'email'}
                                direction={
                                    sortField === 'email' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('email')}
                            >
                                Email
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                            <TableSortLabel
                                active={sortField === 'role'}
                                direction={
                                    sortField === 'role' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('role')}
                            >
                                Role
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                            <TableSortLabel
                                active={sortField === 'status'}
                                direction={
                                    sortField === 'status' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('status')}
                            >
                                Status
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                            <TableSortLabel
                                active={sortField === 'lastActivity'}
                                direction={
                                    sortField === 'lastActivity' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('lastActivity')}
                            >
                                Last Activity
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                            <TableSortLabel
                                active={sortField === 'registeredAt'}
                                direction={
                                    sortField === 'registeredAt' && sortOrder
                                        ? sortOrder
                                        : 'asc'
                                }
                                onClick={() => setSorting('registeredAt')}
                            >
                                Registered
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => {
                        const userStatus = generateStatus(user.firstName)
                        return (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor:
                                            theme.palette.action.hover,
                                    },
                                }}
                            >
                                <TableCell>
                                    <Avatar
                                        src={user.avatar}
                                        alt={user.firstName}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 500 }}>
                                    {user.firstName}
                                </TableCell>
                                <TableCell
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role.toUpperCase()}
                                        color={getRoleColor(user.role)}
                                        size="small"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {getStatusChip(userStatus)}
                                </TableCell>
                                <TableCell
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    {user.lastActivity}
                                </TableCell>
                                <TableCell
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    {user.registeredAt}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Tooltip title="View">
                                            <IconButton
                                                size="small"
                                                color="info"
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title={
                                                user.status === 'suspended'
                                                    ? 'Already suspended'
                                                    : 'Suspend'
                                            }
                                        >
                                            <span>
                                                <IconButton
                                                    size="small"
                                                    color="warning"
                                                    disabled={
                                                        user.status ===
                                                        'suspended'
                                                    }
                                                >
                                                    <BlockIcon fontSize="small" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                size="small"
                                                color="error"
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

export default UsersTable
