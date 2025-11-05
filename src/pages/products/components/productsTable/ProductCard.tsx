import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    IconButton,
    Divider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import { Product } from '@stores/prodStore'
import { getStockChipProps } from '../../utils/productHelpers'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const { id, title, category, price, stock, thumbnail } = product

    return (
        <Card
            sx={{
                overflow: 'visible',
                '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                },
            }}
        >
            <CardContent sx={{ p: 2.5 }}>
                {/* Header: Imagen + Título */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box
                        component="img"
                        src={thumbnail}
                        alt={title}
                        sx={{
                            width: 72,
                            height: 72,
                            borderRadius: 2,
                            objectFit: 'cover',
                            flexShrink: 0,
                            bgcolor: 'grey.100',
                        }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                mb: 0.75,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                lineHeight: 1.4,
                            }}
                        >
                            {title}
                        </Typography>
                        <Chip
                            label={category}
                            size="small"
                            variant="outlined"
                            sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                textTransform: 'capitalize',
                            }}
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Info: Precio y Stock */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: 'block',
                                fontSize: '0.75rem',
                                mb: 0.5,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Price
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'primary.main',
                            }}
                        >
                            ${price.toFixed(2)}
                        </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: 'block',
                                fontSize: '0.75rem',
                                mb: 0.5,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Stock
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                }}
                            >
                                {stock}
                            </Typography>
                            <Chip
                                label={getStockChipProps(stock).label}
                                size="small"
                                color={getStockChipProps(stock).color}
                                sx={{
                                    height: 24,
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Actions */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <IconButton
                        size="medium"
                        color="primary"
                        sx={{
                            border: '1px solid',
                            borderColor: 'primary.main',
                            borderRadius: 1.5,
                            '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'white',
                            },
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="medium"
                        color="info"
                        sx={{
                            border: '1px solid',
                            borderColor: 'info.main',
                            borderRadius: 1.5,
                            '&:hover': {
                                bgcolor: 'info.main',
                                color: 'white',
                            },
                        }}
                    >
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="medium"
                        color="error"
                        sx={{
                            border: '1px solid',
                            borderColor: 'error.main',
                            borderRadius: 1.5,
                            '&:hover': {
                                bgcolor: 'error.main',
                                color: 'white',
                            },
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    )
}
