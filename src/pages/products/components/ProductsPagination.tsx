import {
    Box,
    Pagination,
    Select,
    MenuItem,
    Typography,
    FormControl,
    Paper,
    Grid,
} from '@mui/material'
import { useProductsStore } from '@stores/productsStore'
import { useMemo } from 'react'

export default function ProductsPagination() {
    const products = useProductsStore((state) => state.products)
    const searchQuery = useProductsStore((state) => state.searchQuery)
    const filters = useProductsStore((state) => state.filters)
    const page = useProductsStore((state) => state.page)
    const rowsPerPage = useProductsStore((state) => state.rowsPerPage)
    const setPage = useProductsStore((state) => state.setPage)
    const setRowsPerPage = useProductsStore((state) => state.setRowsPerPage)

    // Calculate total filtered items
    const totalItems = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                product.category
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())

            const matchesCategory =
                !filters.category || product.category === filters.category

            const matchesStock =
                filters.stockStatus === 'all' ||
                (filters.stockStatus === 'low' &&
                    product.stock > 0 &&
                    product.stock < 20) ||
                (filters.stockStatus === 'out' && product.stock === 0)

            const matchesPrice =
                filters.priceRange === 'all' ||
                (filters.priceRange === 'low' && product.price < 50) ||
                (filters.priceRange === 'medium' &&
                    product.price >= 50 &&
                    product.price < 200) ||
                (filters.priceRange === 'high' && product.price >= 200)

            return (
                matchesSearch && matchesCategory && matchesStock && matchesPrice
            )
        }).length
    }, [products, searchQuery, filters])

    const totalPages = Math.ceil(totalItems / rowsPerPage)
    const startItem = (page - 1) * rowsPerPage + 1
    const endItem = Math.min(page * rowsPerPage, totalItems)

    return (
        <Paper sx={{ mt: 3, p: 2 }}>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
            >
                {/* Left side - Rows per page */}
                <Grid size={{ xs: 12, sm: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Rows per page:
                        </Typography>
                        <FormControl size="small">
                            <Select
                                value={rowsPerPage}
                                onChange={(e) =>
                                    setRowsPerPage(Number(e.target.value))
                                }
                                sx={{ minWidth: 70 }}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="body2" color="text.secondary">
                            {startItem}-{endItem} of {totalItems}
                        </Typography>
                    </Box>
                </Grid>

                {/* Right side - Pagination */}
                <Grid size={{ xs: 12, sm: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', sm: 'flex-end' },
                        }}
                    >
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
