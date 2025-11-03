import {
    Box,
    Chip,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import CloseIcon from '@mui/icons-material/Close'
import { useProdStore } from '@stores/prodStore'

export default function ProductsFilters({
    categories,
}: {
    categories: number[]
}) {
    const currentCategory = useProdStore((state) => state.currentCategory)
    const setCurrentCategory = useProdStore((state) => state.setCurrentCategory)

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
                            {categories.map((cat) => (
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
                {/* <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {STOCK_FILTERS.map((filter) => (
                        <Chip
                            key={filter.value}
                            label={filter.label}
                            onClick={() =>
                                setFilters({
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
                </Box> */}
            </Box>

            {/* Price Range */}
            <Box>
                <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}
                >
                    Price Range
                </Typography>
                {/* <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
                </Box> */}
            </Box>
        </Box>
    )
}
