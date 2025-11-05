import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Chip,
    IconButton,
    Box,
    TableSortLabel,
    Typography,
    Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Product, useProdStore } from '@stores/prodStore'

export default function TableDesktop({
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

    const getStockChipProps = (stock: number) => {
        if (stock === 0) {
            return { color: 'error' as const, label: 'Out of Stock' }
        } else if (stock <= 10) {
            return { color: 'warning' as const, label: 'Low Stock' }
        } else {
            return { color: 'success' as const, label: 'In Stock' }
        }
    }
    return (
        <TableContainer
            component={Paper}
            sx={{
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'background.default',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'action.disabled',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: 'action.active',
                    },
                },
            }}
        >
            <Table sx={{ tableLayout: 'fixed', minWidth: 900 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: '80px' }}>Image</TableCell>
                        <TableCell sx={{ width: '30%' }}>
                            <TableSortLabel
                                active={sortField === 'title'}
                                direction={
                                    sortField === 'title' ? sortOrder : 'asc'
                                }
                                onClick={() => setSorting('title')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: '18%' }}>
                            <TableSortLabel
                                active={sortField === 'category'}
                                direction={
                                    sortField === 'category' ? sortOrder : 'asc'
                                }
                                onClick={() => setSorting('category')}
                            >
                                Category
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: '12%' }}>
                            <TableSortLabel
                                active={sortField === 'price'}
                                direction={
                                    sortField === 'price' ? sortOrder : 'asc'
                                }
                                onClick={() => setSorting('price')}
                            >
                                Price
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: '20%' }}>
                            <TableSortLabel
                                active={sortField === 'stock'}
                                direction={
                                    sortField === 'stock' ? sortOrder : 'asc'
                                }
                                onClick={() => setSorting('stock')}
                            >
                                Stock
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right" sx={{ width: '120px' }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(
                        ({ id, title, category, price, stock, thumbnail }) => (
                            <TableRow
                                key={id}
                                hover
                                sx={{
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
                                    <Chip
                                        label={category}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                    >
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
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            {stock}
                                        </Typography>
                                        <Chip
                                            label={
                                                getStockChipProps(stock).label
                                            }
                                            size="small"
                                            color={
                                                getStockChipProps(stock).color
                                            }
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
                                        <IconButton
                                            size="small"
                                            color="primary"
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="info">
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
