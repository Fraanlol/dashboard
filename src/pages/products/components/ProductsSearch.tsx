import {
    Box,
    Button,
    InputAdornment,
    Paper,
    TextField,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { useProdStore, Product } from '@stores/prodStore'
import { useProductModalStore } from '@stores/productModalStore'
import ExportProductsButton from './ExportProductsButton'
import { useTranslation } from 'react-i18next'

interface ProductsSearchProps {
    products: Product[]
    isLoading: boolean
}

export default function ProductsSearch({
    products,
    isLoading,
}: ProductsSearchProps) {
    const { t } = useTranslation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const searchQuery = useProdStore((state) => state.searchQuery)
    const setSearchQuery = useProdStore((state) => state.setSearchQuery)
    const openCreateModal = useProductModalStore(
        (state) => state.openCreateModal
    )

    return (
        <Paper
            sx={{
                p: { xs: 1.5, md: 2 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'stretch', md: 'center' },
                gap: { xs: 1.5, md: 2 },
            }}
        >
            <TextField
                fullWidth
                placeholder={t('products.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            />

            {!isMobile && (
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <ExportProductsButton
                        products={products}
                        disabled={isLoading || products.length === 0}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={openCreateModal}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: 'none',
                        }}
                    >
                        {t('products.addProduct')}
                    </Button>
                </Box>
            )}
        </Paper>
    )
}
