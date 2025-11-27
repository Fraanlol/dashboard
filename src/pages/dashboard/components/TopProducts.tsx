import {
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Box,
    Rating,
    Chip,
    CircularProgress,
    Alert,
    Button,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@api/products-api'
import { Product } from '@stores/prodStore'
import { ProductsResponse } from '@api/products-api'

export default function TopProducts() {
    const { data, isLoading, isError, refetch } = useQuery<ProductsResponse>({
        queryKey: ['top-products'],
        queryFn: () =>
            getProducts({ limit: '5', sortBy: 'rating', order: 'desc' }),
    })

    const theme = useTheme()

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 200,
                }}
            >
                <CircularProgress />
            </Box>
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
                            Retry
                        </Button>
                    }
                >
                    Failed to load data. Please try again.
                </Alert>
            </Box>
        )
    }

    if (!data?.products || data.products.length === 0) {
        return (
            <Alert severity="info" sx={{ m: 2 }}>
                No products found
            </Alert>
        )
    }

    const products = data.products

    return (
        <List sx={{ width: '100%', padding: 0 }} className="flex-1">
            {products.map(
                ({ id, title, category, price, rating, thumbnail }, index) => (
                    <ListItem
                        key={id}
                        sx={{
                            px: 0,
                            py: { xs: 1.5, md: 2 },
                            borderBottom:
                                index < products.length - 1
                                    ? `1px solid ${theme.palette.divider}`
                                    : 'none',
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar
                                variant="rounded"
                                src={thumbnail}
                                alt={title}
                                sx={{
                                    width: { xs: 48, md: 60 },
                                    height: { xs: 48, md: 60 },
                                    mr: { xs: 1.5, md: 2 },
                                }}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            slotProps={{ secondary: { component: 'span' } }}
                            primary={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: { xs: 0.5, md: 1 },
                                        mb: 0.5,
                                        flexWrap: { xs: 'wrap', md: 'nowrap' },
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            color: 'text.primary',
                                            fontSize: {
                                                xs: '0.875rem',
                                                md: '1rem',
                                            },
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                    <Chip
                                        label={category}
                                        size="small"
                                        sx={{
                                            height: { xs: 18, md: 20 },
                                            fontSize: {
                                                xs: '0.65rem',
                                                md: '0.75rem',
                                            },
                                            bgcolor: theme.palette.action.hover,
                                            color: 'text.secondary',
                                            '& .MuiChip-label': {
                                                px: { xs: 0.75, md: 1 },
                                            },
                                        }}
                                    />
                                </Box>
                            }
                            secondary={
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'flex',
                                        alignItems: {
                                            xs: 'flex-start',
                                            md: 'center',
                                        },
                                        justifyContent: 'space-between',
                                        mt: 0.5,
                                        gap: 1,
                                        flexDirection: {
                                            xs: 'column',
                                            sm: 'row',
                                        },
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'primary.main',
                                            fontSize: {
                                                xs: '1rem',
                                                md: '1.25rem',
                                            },
                                        }}
                                    >
                                        ${price.toFixed(2)}
                                    </Typography>
                                    <Box
                                        component="span"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                        }}
                                    >
                                        <Rating
                                            value={rating}
                                            precision={0.1}
                                            size="small"
                                            readOnly
                                            sx={{
                                                fontSize: {
                                                    xs: '1rem',
                                                    md: '1.25rem',
                                                },
                                            }}
                                        />
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: {
                                                    xs: '0.75rem',
                                                    md: '0.875rem',
                                                },
                                            }}
                                        >
                                            {rating}
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                        />
                    </ListItem>
                )
            )}
        </List>
    )
}
