import {
    Avatar,
    Box,
    Chip,
    IconButton,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material'
import { Product, useProdStore } from '@stores/prodStore'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { getStockChipProps } from '../../utils/productHelpers'
import {
    useProductModalStore,
    useDeleteDialogStore,
} from '@stores/productModalStore'
import { useTranslation } from 'react-i18next'

export default function TableRowProduct({ product }: { product: Product }) {
    const { t } = useTranslation()
    const openEditModal = useProductModalStore((state) => state.openEditModal)
    const openDeleteDialog = useDeleteDialogStore(
        (state) => state.openDeleteDialog
    )

    const { id, title, category, price, stock, thumbnail } = product
    const stockProps = getStockChipProps(stock)
    return (
        <TableRow
            key={id}
            sx={{
                '&:hover': {
                    bgcolor: 'action.hover',
                },
                '&:last-child td, &:last-child th': {
                    border: 0,
                },
            }}
        >
            <TableCell>
                <Avatar
                    src={thumbnail}
                    alt={title}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                />
            </TableCell>
            <TableCell>
                <Tooltip
                    title={title}
                    arrow
                    enterDelay={500}
                    leaveDelay={0}
                    disableInteractive
                >
                    <span
                        style={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            component="span"
                        >
                            {title}
                        </Typography>
                    </span>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Chip label={category} size="small" variant="outlined" />
            </TableCell>
            <TableCell>
                <Typography variant="body2" fontWeight={600}>
                    ${price.toFixed(2)}
                </Typography>
            </TableCell>
            <TableCell>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        {stock}
                    </Typography>
                    <Chip
                        label={stockProps.label}
                        size="small"
                        color={stockProps.color}
                        variant="outlined"
                    />
                </Box>
            </TableCell>
            <TableCell align="right">
                <Box
                    sx={{
                        display: 'flex',
                        gap: 0.5,
                        justifyContent: 'flex-end',
                    }}
                >
                    <Tooltip title={t('products.table.editProduct')}>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => openEditModal(product)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('products.table.duplicateProduct')}>
                        <IconButton size="small" color="info">
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('products.table.deleteProduct')}>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                                openDeleteDialog({
                                    id: product.id,
                                    title: product.title,
                                })
                            }
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </TableCell>
        </TableRow>
    )
}
