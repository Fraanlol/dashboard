import {
    Box,
    Typography,
    Stack,
    Divider,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import { Product, useProdStore, SortFieldType } from '@stores/prodStore'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ProductCard from './ProductCard'
import { SORT_OPTIONS, getSortLabel } from '../../utils/productHelpers'

export default function CardMobile({
    products,
    isLoading,
    isError,
}: {
    products: Product[]
    isLoading: boolean
    isError: boolean
}) {
    const sortField = useProdStore((state) => state.sortField)
    const sortOrder = useProdStore((state) => state.sortOrder)
    const setSorting = useProdStore((state) => state.setSorting)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSort = (field: SortFieldType) => {
        setSorting(field)
        handleClose()
    }

    if (isLoading) {
        // Tu skeleton aquí
        return null
    }

    if (isError) {
        // Tu error state aquí
        return null
    }

    if (products.length === 0) {
        // Tu empty state aquí
        return null
    }

    return (
        <>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    bgcolor: 'background.default',
                    pb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {products.length} products
                </Typography>

                <Button
                    variant={sortField ? 'contained' : 'outlined'}
                    size="small"
                    startIcon={<SortIcon />}
                    endIcon={
                        sortField ? (
                            sortOrder === 'asc' ? (
                                <ArrowUpwardIcon fontSize="small" />
                            ) : (
                                <ArrowDownwardIcon fontSize="small" />
                            )
                        ) : null
                    }
                    onClick={handleClick}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    {getSortLabel(sortField, sortOrder)}
                </Button>
            </Box>

            {/* Sort Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200,
                        borderRadius: 2,
                    },
                }}
            >
                <MenuItem
                    onClick={() => handleSort(null)}
                    selected={!sortField}
                >
                    <ListItemIcon>
                        {!sortField && <CheckIcon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText>Default</ListItemText>
                </MenuItem>
                <Divider />
                {SORT_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.field}
                        onClick={() => handleSort(option.field)}
                        selected={sortField === option.field}
                    >
                        <ListItemIcon>
                            {sortField === option.field && (
                                <CheckIcon fontSize="small" />
                            )}
                        </ListItemIcon>
                        <ListItemText>{option.label}</ListItemText>
                        {sortField === option.field && (
                            <ListItemIcon sx={{ ml: 2 }}>
                                {sortOrder === 'asc' ? (
                                    <ArrowUpwardIcon fontSize="small" />
                                ) : (
                                    <ArrowDownwardIcon fontSize="small" />
                                )}
                            </ListItemIcon>
                        )}
                    </MenuItem>
                ))}
            </Menu>
            <Stack spacing={2} sx={{ px: { xs: 0, sm: 0 }, pb: 2 }}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Stack>
        </>
    )
}
