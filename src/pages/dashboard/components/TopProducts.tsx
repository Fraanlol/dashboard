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
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@api/products-api'
import { Product } from '@stores/prodStore'
import { ProductsResponse } from '@api/products-api'

export default function TopProducts() {
    const { data, isLoading, isError, error } = useQuery<ProductsResponse>({
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
            <Alert severity="error" sx={{ m: 2 }}>
                Error loading products
            </Alert>
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
                            py: 2,
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
                                    width: 60,
                                    height: 60,
                                    mr: 2,
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
                                        gap: 1,
                                        mb: 0.5,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 500,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                    <Chip
                                        label={category}
                                        size="small"
                                        sx={{
                                            height: 20,
                                            fontSize: '0.75rem',
                                            bgcolor: theme.palette.action.hover,
                                            color: 'text.secondary',
                                        }}
                                    />
                                </Box>
                            }
                            secondary={
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mt: 0.5,
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'primary.main',
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
                                        />
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '0.875rem',
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
