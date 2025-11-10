import MainLayout from '@layout/mainLayout'
import { useMediaQuery, useTheme, Grid } from '@mui/material'
import UsersKPI from './components/UsersKPI'
import UsersSearch from './components/UsersSearch'
import UsersFilters from './components/UsersFilters'
import UsersTable from './components/UsersTable'
import UsersPagination from './components/UsersPagination'
import { useMemo } from 'react'

import { useUsersStore } from '@stores/usersStore'
import { UsersResponse, getUsers } from '@api/users.api'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export default function Users() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const currentPage = useUsersStore((state) => state.currentPage)
    const rowsPerPage = useUsersStore((state) => state.rowsPerPage)
    const categoryFilter = useUsersStore((state) => state.currentCategory)
    const sortField = useUsersStore((state) => state.sortField)
    const sortOrder = useUsersStore((state) => state.sortOrder)
    const searchQuery = useUsersStore((state) => state.searchQuery)
    const filters = useUsersStore((state) => state.filters)

    const { data, isLoading, isError } = useQuery<UsersResponse>({
        queryKey: ['users'],
        placeholderData: keepPreviousData,
        queryFn: () => {
            const baseParams: Record<string, string> = {
                limit: '0',
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
            searchQuery.trim() ||
            (filters.stockStatus && filters.stockStatus !== 'all') ||
            (filters.priceRange && filters.priceRange !== 'all')

        if (!hasFilters) {
            return users
        }

        let filtered = [...users]
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.email
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
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

    console.log(paginatedUsers)

    return (
        <MainLayout>
            <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <div className="text-gray-600">
                        <h1 className="fade-in font-bold text-xl">Products</h1>
                        <p className="fade-in text-sm">
                            Manage and monitor your user base
                        </p>
                    </div>
                </Grid>
            </Grid>
            <UsersKPI users={users} isLoading={isLoading} />
            <UsersFilters />
            <UsersSearch />
            <UsersTable
                users={paginatedUsers}
                isLoading={isLoading}
                isError={isError}
            />
            <UsersPagination
                totalUsers={totalItems}
                page={currentPage}
                rowsPerPage={rowsPerPage}
            />
        </MainLayout>
    )
}
