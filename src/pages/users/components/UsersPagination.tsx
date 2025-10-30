import {
    Box,
    FormControl,
    MenuItem,
    Pagination,
    Paper,
    Select,
    SelectChangeEvent,
    Typography,
    useTheme,
    Grid,
} from '@mui/material'
import { useUsersStore } from '@stores/usersStore'
import { useMemo } from 'react'

const UsersPagination = () => {
    const theme = useTheme()
    const users = useUsersStore((state) => state.users)
    const searchQuery = useUsersStore((state) => state.searchQuery)
    const filters = useUsersStore((state) => state.filters)
    const page = useUsersStore((state) => state.page)
    const rowsPerPage = useUsersStore((state) => state.rowsPerPage)
    const setPage = useUsersStore((state) => state.setPage)
    const setRowsPerPage = useUsersStore((state) => state.setRowsPerPage)

    const totalItems = useMemo(() => {
        let result = users

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (user) =>
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query)
            )
        }

        if (filters.role) {
            result = result.filter((user) => user.role === filters.role)
        }

        if (filters.status !== 'all') {
            result = result.filter((user) => user.status === filters.status)
        }

        return result.length
    }, [users, searchQuery, filters])

    const totalPages = Math.ceil(totalItems / rowsPerPage)

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value)
    }

    const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
        setRowsPerPage(Number(event.target.value))
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
            }}
        >
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid size={{ xs: 12, sm: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            Rows per page:
                        </Typography>
                        <FormControl size="small">
                            <Select
                                value={rowsPerPage}
                                onChange={handleRowsPerPageChange}
                                sx={{ minWidth: 80 }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, totalItems)} of ${totalItems}`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 'auto' }}
                    sx={{ ml: 'auto' }}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        shape="rounded"
                        sx={{
                            ul: { justifyContent: 'center' },
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default UsersPagination
