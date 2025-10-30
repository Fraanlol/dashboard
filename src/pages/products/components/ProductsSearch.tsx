import { TextField, InputAdornment, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useProductsStore } from '@stores/productsStore'

export default function ProductsSearch() {
    const searchQuery = useProductsStore((state) => state.searchQuery)
    const setSearchQuery = useProductsStore((state) => state.setSearchQuery)

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <TextField
                fullWidth
                size="small"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: 'primary.main',
                        },
                    },
                }}
            />
        </Paper>
    )
}
