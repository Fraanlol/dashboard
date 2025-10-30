import { Box, Chip, Typography } from '@mui/material'
import { useProductsStore } from '@stores/productsStore'

export interface ProductFilters {
    category: string | null
    stockStatus: 'all' | 'low' | 'out'
    priceRange: 'all' | 'low' | 'medium' | 'high'
}

const CATEGORIES = ['Electronics', 'Clothing', 'Food', 'Home', 'Sports', 'Toys']

const STOCK_FILTERS = [
    { label: 'All Stock', value: 'all' as const },
    { label: 'Low Stock', value: 'low' as const },
    { label: 'Out of Stock', value: 'out' as const },
]

const PRICE_FILTERS = [
    { label: 'All Prices', value: 'all' as const },
    { label: '$0-$50', value: 'low' as const },
    { label: '$50-$200', value: 'medium' as const },
    { label: '$200+', value: 'high' as const },
]

export default function ProductsFilters() {
    const filters = useProductsStore((state) => state.filters)
    const setFilters = useProductsStore((state) => state.setFilters)
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
                    <Chip
                        label="All"
                        onClick={() =>
                            setFilters({ ...filters, category: null })
                        }
                        color={
                            filters.category === null ? 'primary' : 'default'
                        }
                        variant={
                            filters.category === null ? 'filled' : 'outlined'
                        }
                    />
                    {CATEGORIES.map((category) => (
                        <Chip
                            key={category}
                            label={category}
                            onClick={() => setFilters({ ...filters, category })}
                            color={
                                filters.category === category
                                    ? 'primary'
                                    : 'default'
                            }
                            variant={
                                filters.category === category
                                    ? 'filled'
                                    : 'outlined'
                            }
                        />
                    ))}
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
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    stockStatus: filter.value,
                                })
                            }
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
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    priceRange: filter.value,
                                })
                            }
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
        </Box>
    )
}
