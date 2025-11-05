import {
    Box,
    Chip,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import CloseIcon from '@mui/icons-material/Close'
import ClearIcon from '@mui/icons-material/Clear'
import { useProdStore } from '@stores/prodStore'
import { use } from 'react'

export default function ProductsFilters({
    categories,
    isLoading,
}: {
    categories: string[] | undefined
    isLoading: boolean
}) {
    const currentCategory = useProdStore((state) => state.currentCategory)
    const setCurrentCategory = useProdStore((state) => state.setCurrentCategory)

    const filters = useProdStore((state) => state.filters)
    const setStockStatus = useProdStore((state) => state.setStockStatus)
    const setPriceRange = useProdStore((state) => state.setPriceRange)
    const sortField = useProdStore((state) => state.sortField)
    // Función para resetear todos los filtros
    const resetAllFilters = useProdStore((state) => state.resetFilters)

    // Helper para verificar si hay filtros activos
    const hasActiveFilters =
        currentCategory !== 'all' ||
        filters.stockStatus !== 'all' ||
        filters.priceRange !== 'all' ||
        sortField !== null

    const STOCK_FILTERS = [
        { label: 'All Stock', value: 'all' },
        { label: 'In Stock', value: 'in-stock' },
        { label: 'Low Stock', value: 'low-stock' },
        { label: 'Out of Stock', value: 'out-of-stock' },
    ]

    const PRICE_FILTERS = [
        { label: 'All Prices', value: 'all' },
        { label: 'Under $50', value: 'under-50' },
        { label: '$50 - $100', value: '50-100' },
        { label: '$100 - $500', value: '100-500' },
        { label: 'Over $500', value: 'over-500' },
    ]

    return (
        <Box sx={{ mb: 3 }}>
            {/* Categories */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}
                >
                    Categories
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {/* Icon decorativo */}
                    <FilterListIcon sx={{ color: 'text.secondary' }} />

                    {/* Select de categorías */}
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                        <InputLabel>Filter by Category</InputLabel>
                        <Select
                            value={currentCategory || ''}
                            label="Filter by Category"
                            onChange={(e) =>
                                setCurrentCategory(e.target.value || 'all')
                            }
                            sx={{ bgcolor: 'white' }}
                        >
                            <MenuItem value="all">
                                <em>All Categories</em>
                            </MenuItem>
                            {categories?.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Chip mostrando filtro activo */}
                    {currentCategory && (
                        <Chip
                            label={currentCategory}
                            onDelete={() => setCurrentCategory('all')}
                            color="primary"
                            variant="outlined"
                            deleteIcon={<CloseIcon />}
                            sx={{ fontWeight: 500 }}
                        />
                    )}
                </Box>
            </Box>

            {/* Stock Status */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}
                >
                    Stock Status
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {STOCK_FILTERS.map((filter) => (
                        <Chip
                            key={filter.value}
                            label={filter.label}
                            onClick={() => setStockStatus(filter.value)}
                            color={
                                filters.stockStatus === filter.value
                                    ? 'primary'
                                    : 'default'
                            }
                            variant={
                                filters.stockStatus === filter.value
                                    ? 'filled'
                                    : 'outlined'
                            }
                        />
                    ))}
                </Box>
            </Box>

            {/* Price Range */}
            <Box>
                <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}
                >
                    Price Range
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {PRICE_FILTERS.map((filter) => (
                        <Chip
                            key={filter.value}
                            label={filter.label}
                            onClick={() => setPriceRange(filter.value)}
                            color={
                                filters.priceRange === filter.value
                                    ? 'primary'
                                    : 'default'
                            }
                            variant={
                                filters.priceRange === filter.value
                                    ? 'filled'
                                    : 'outlined'
                            }
                        />
                    ))}
                </Box>
            </Box>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        onClick={resetAllFilters}
                        size="small"
                        sx={{ borderRadius: 2 }}
                    >
                        Clear All Filters
                    </Button>
                </Box>
            )}
        </Box>
    )
}
