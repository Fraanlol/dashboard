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
    Tooltip,
    useTheme,
} from '@mui/material'
import { useUsersStore, User } from '@stores/usersStore'
import { useMemo, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

type SortField =
    | 'name'
    | 'email'
    | 'role'
    | 'status'
    | 'lastActivity'
    | 'registeredAt'
type SortOrder = 'asc' | 'desc'

const UsersTable = () => {
    const theme = useTheme()
    const users = useUsersStore((state) => state.users)
    const searchQuery = useUsersStore((state) => state.searchQuery)
    const filters = useUsersStore((state) => state.filters)
    const page = useUsersStore((state) => state.page)
    const rowsPerPage = useUsersStore((state) => state.rowsPerPage)
    const deleteUser = useUsersStore((state) => state.deleteUser)

    const [sortField, setSortField] = useState<SortField>('name')
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortOrder('asc')
        }
    }

    const filteredUsers = useMemo(() => {
        let result = users

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (user) =>
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query)
            )
        }

        // Role filter
        if (filters.role) {
            result = result.filter((user) => user.role === filters.role)
        }

        // Status filter
        if (filters.status !== 'all') {
            result = result.filter((user) => user.status === filters.status)
        }

        return result
    }, [users, searchQuery, filters])

    const sortedAndPaginatedUsers = useMemo(() => {
        const sorted = [...filteredUsers].sort((a, b) => {
            let aValue: string | number
            let bValue: string | number

            switch (sortField) {
                case 'name':
                case 'email':
                case 'role':
                case 'status':
                    aValue = a[sortField]
                    bValue = b[sortField]
                    break
                case 'lastActivity':
                case 'registeredAt':
                    aValue = a[sortField]
                    bValue = b[sortField]
                    break
                default:
                    return 0
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1
            } else {
                return aValue < bValue ? 1 : -1
            }
        })

        const startIndex = (page - 1) * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        return sorted.slice(startIndex, endIndex)
    }, [filteredUsers, sortField, sortOrder, page, rowsPerPage])

    const getRoleColor = (role: User['role']) => {
        switch (role) {
            case 'admin':
                return 'error'
            case 'user':
                return 'primary'
            case 'guest':
                return 'default'
            default:
                return 'default'
        }
    }

    const getStatusColor = (status: User['status']) => {
        switch (status) {
            case 'active':
                return 'success'
            case 'inactive':
                return 'warning'
            case 'suspended':
                return 'error'
            default:
                return 'default'
        }
    }

    const SortableHeader = ({
        field,
        children,
    }: {
        field: SortField
        children: React.ReactNode
    }) => (
        <TableCell
            onClick={() => handleSort(field)}
            sx={{
                cursor: 'pointer',
                userSelect: 'none',
                fontWeight: 600,
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {children}
                {sortField === field &&
                    (sortOrder === 'asc' ? (
                        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                    ) : (
                        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                    ))}
            </Box>
        </TableCell>
    )

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
                        <SortableHeader field="name">Name</SortableHeader>
                        <SortableHeader field="email">Email</SortableHeader>
                        <SortableHeader field="role">Role</SortableHeader>
                        <SortableHeader field="status">Status</SortableHeader>
                        <SortableHeader field="lastActivity">
                            Last Activity
                        </SortableHeader>
                        <SortableHeader field="registeredAt">
                            Registered
                        </SortableHeader>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedAndPaginatedUsers.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            <TableCell>
                                <Avatar src={user.avatar} alt={user.name} />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>
                                {user.name}
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
                                <Chip
                                    label={
                                        user.status.charAt(0).toUpperCase() +
                                        user.status.slice(1)
                                    }
                                    color={getStatusColor(user.status)}
                                    size="small"
                                    variant="outlined"
                                />
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
                                        <IconButton size="small" color="info">
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
                                                    user.status === 'suspended'
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
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UsersTable
