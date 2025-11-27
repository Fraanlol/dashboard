import MainLayout from '@layout/mainLayout'
import { useMediaQuery, useTheme, Grid, Box } from '@mui/material'
import UsersKPI from './components/UsersKPI'
import UsersSearch from './components/UsersSearch'
import UsersFilters from './components/UsersFilters'
import UsersTable from './components/UsersTable'
import UsersPagination from './components/UsersPagination'
import ExportUsersButton from './components/ExportUsersButton'
import UserModal from '@components/UserModal'
import DeleteUserConfirmDialog from '@components/DeleteUserConfirmDialog'
import { useMemo, useEffect } from 'react'

import { useUsersStore } from '@stores/usersStore'
import { UsersResponse, getUsers } from '@api/users.api'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useUserMutations } from '../../hooks/useUserMutations'
import {
    useUserModalStore,
    useDeleteUserDialogStore,
} from '@stores/userModalStore'
import { fadeSlideIn } from '@styles/animations'
import { useTranslation } from 'react-i18next'

export default function Users() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation()

    const currentPage = useUsersStore((state) => state.currentPage)
    const rowsPerPage = useUsersStore((state) => state.rowsPerPage)
    const categoryFilter = useUsersStore((state) => state.currentCategory)
    const sortField = useUsersStore((state) => state.sortField)
    const sortOrder = useUsersStore((state) => state.sortOrder)
    const searchQuery = useUsersStore((state) => state.searchQuery)
    const filters = useUsersStore((state) => state.filters)

    // User mutations
    const { createUser, updateUser, deleteUser } = useUserMutations()

    const setOnSubmit = useUserModalStore((state) => state.setOnSubmit)
    const setOnDelete = useDeleteUserDialogStore((state) => state.setOnDelete)

    // Set up callbacks for modals
    useEffect(() => {
        setOnSubmit((data, mode) => {
            if (mode === 'create') {
                createUser(data)
            } else if (mode === 'edit') {
                updateUser(data)
            }
        })

        setOnDelete((id: number) => {
            deleteUser(id)
        })
    }, [createUser, updateUser, deleteUser, setOnSubmit, setOnDelete])

    const { data, isLoading, isError, refetch } = useQuery<UsersResponse>({
        queryKey: ['users'],
        placeholderData: keepPreviousData,
        queryFn: () => {
            const baseParams: Record<string, string> = {
                limit: '0',
                select: 'id,firstName,lastName,email,image,role,age,gender',
            }
            if (categoryFilter !== 'all') {
                return getUsers({
                    ...baseParams,
                })
            }
            return getUsers(baseParams)
        },
    })

    let users = data?.users || []

    const filteredUsers = useMemo(() => {
        const hasFilters =
            searchQuery.trim() || (filters.role && filters.role !== null)

        if (!hasFilters) {
            return users
        }

        let filtered = [...users]
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (user) =>
                    user.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.email
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
        }
        if (filters.role && filters.role !== null) {
            filtered = filtered.filter((user) => user.role === filters.role)
        }

        return filtered
    }, [users, searchQuery, filters])

    const sortedUsers = useMemo(() => {
        if (!sortField) return filteredUsers

        const sorted = [...filteredUsers]

        sorted.sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]

            // Handle string comparison
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue)
                return sortOrder === 'asc' ? comparison : -comparison
            }

            // Handle number comparison
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
            }

            return 0
        })

        return sorted
    }, [filteredUsers, sortField, sortOrder])

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage
        return sortedUsers.slice(startIndex, startIndex + rowsPerPage)
    }, [sortedUsers, currentPage, rowsPerPage])

    const totalItems = sortedUsers.length
    return (
        <MainLayout>
            <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }} sx={fadeSlideIn()}>
                    <div className="text-gray-600">
                        <h1 className="fade-in font-bold text-xl">
                            {t('users.title')}
                        </h1>
                        <p className="fade-in text-sm">{t('users.subtitle')}</p>
                    </div>
                </Grid>
                {!isMobile && (
                    <Grid size={{ xs: 12, md: 6 }} sx={fadeSlideIn(0.05)}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <ExportUsersButton
                                users={sortedUsers}
                                disabled={isLoading}
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
            <Box sx={fadeSlideIn(0.08)}>
                <UsersKPI users={users} isLoading={isLoading} />
            </Box>
            <Box sx={fadeSlideIn(0.12)}>
                <UsersFilters />
            </Box>
            <Box sx={fadeSlideIn(0.16)}>
                <UsersSearch />
            </Box>
            <Box sx={fadeSlideIn(0.2)}>
                <UsersTable
                    users={paginatedUsers}
                    isLoading={isLoading}
                    isError={isError}
                    refetch={refetch}
                />
            </Box>
            <Box sx={fadeSlideIn(0.24)}>
                <UsersPagination
                    totalUsers={totalItems}
                    page={currentPage}
                    rowsPerPage={rowsPerPage}
                />
            </Box>
            {isMobile && (
                <Box sx={[fadeSlideIn(0.28), { mt: 2 }]}>
                    <ExportUsersButton
                        users={sortedUsers}
                        disabled={isLoading}
                    />
                </Box>
            )}

            {/* Modals */}
            <UserModal />
            <DeleteUserConfirmDialog />
        </MainLayout>
    )
}
