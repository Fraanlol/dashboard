import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import SortIcon from '@mui/icons-material/Sort'
import { Product, useProdStore, SortFieldType } from '@stores/prodStore'
import { useTranslation } from 'react-i18next'
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
    refetch,
}: {
    products: Product[]
    isLoading: boolean
    isError: boolean
    refetch: () => void
}) {
    const sortField = useProdStore((state) => state.sortField)
    const sortOrder = useProdStore((state) => state.sortOrder)
    const setSorting = useProdStore((state) => state.setSorting)
    const { t } = useTranslation()

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
        return (
            <Stack spacing={2} sx={{ px: { xs: 0, sm: 0 }, pb: 2 }}>
                {[1, 2, 3].map((item) => (
                    <Card key={item}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <Skeleton
                                    variant="rounded"
                                    width={72}
                                    height={72}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton
                                        variant="text"
                                        width="80%"
                                        height={28}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={100}
                                        height={24}
                                        sx={{ mt: 1 }}
                                    />
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 2,
                                }}
                            >
                                <Box>
                                    <Skeleton variant="text" width={60} />
                                    <Skeleton
                                        variant="text"
                                        width={80}
                                        height={32}
                                    />
                                </Box>
                                <Box>
                                    <Skeleton variant="text" width={60} />
                                    <Skeleton
                                        variant="text"
                                        width={80}
                                        height={32}
                                    />
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        )
    }

    if (isError) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Alert
                    severity="error"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            startIcon={<RefreshIcon />}
                            onClick={() => refetch()}
                        >
                            {t('common.retry')}
                        </Button>
                    }
                >
                    {t('products.messages.loadError')}
                </Alert>
            </Box>
        )
    }

    if (products.length === 0) {
        return (
            <Alert severity="info" sx={{ mt: 2 }}>
                {t('products.messages.noProducts')}
            </Alert>
        )
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
                    {t('products.list.count', { count: products.length })}
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
                    <ListItemText>{t('products.sort.default')}</ListItemText>
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
