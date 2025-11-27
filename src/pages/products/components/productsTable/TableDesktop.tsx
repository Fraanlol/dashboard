import {
    Alert,
    Box,
    Button,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
    useTheme,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { alpha } from '@mui/material/styles'
import { Product, useProdStore } from '@stores/prodStore'
import TableRowProduct from './TableRowProduct'

interface TableDesktopProps {
    products: Product[]
    isLoading: boolean
    isError: boolean
    refetch: () => void
}

export default function TableDesktop({
    products,
    isLoading,
    isError,
    refetch,
}: TableDesktopProps) {
    const theme = useTheme()
    const sortField = useProdStore((state) => state.sortField)
    const sortOrder = useProdStore((state) => state.sortOrder)
    const setSorting = useProdStore((state) => state.setSorting)

    const containerSx = {
        overflowX: 'auto',
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        boxShadow: 'none',
        '&::-webkit-scrollbar': {
            height: '8px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.default,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(theme.palette.text.secondary, 0.3),
            borderRadius: '999px',
        },
    } as const

    const sortLabelSx = {
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: '0.72rem',
        letterSpacing: '0.08em',
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.primary.main,
        },
        '&.Mui-active': {
            color: theme.palette.primary.main,
            fontWeight: 700,
        },
        '& .MuiTableSortLabel-icon': {
            opacity: 0.4,
        },
        '&.Mui-active .MuiTableSortLabel-icon': {
            opacity: 1,
        },
        cursor: 'pointer',
    } as const

    const headerTypographySx = {
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: '0.72rem',
        letterSpacing: '0.08em',
        color: theme.palette.text.secondary,
    } as const

    const renderSkeleton = () => (
        <TableContainer component={Paper} elevation={0} sx={containerSx}>
            <Table sx={{ tableLayout: 'fixed', minWidth: 900 }}>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.background.default,
                                0.85
                            ),
                            '& th': {
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                        }}
                    >
                        {[
                            'Image',
                            'Name',
                            'Category',
                            'Price',
                            'Stock',
                            'Actions',
                        ].map((label) => (
                            <TableCell
                                key={label}
                                align={label === 'Actions' ? 'right' : 'left'}
                            >
                                <Typography
                                    variant="caption"
                                    sx={headerTypographySx}
                                >
                                    {label}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[1, 2, 3, 4, 5].map((row) => (
                        <TableRow key={row}>
                            <TableCell>
                                <Skeleton
                                    variant="rounded"
                                    width={48}
                                    height={48}
                                />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="80%" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width="60%" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width={70} />
                            </TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Skeleton variant="text" width={30} />
                                    <Skeleton
                                        variant="rounded"
                                        width={80}
                                        height={24}
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
                                    {[1, 2, 3].map((action) => (
                                        <Skeleton
                                            key={action}
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                    ))}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    if (isLoading) {
        return renderSkeleton()
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

    if (!products || products.length === 0) {
        return (
            <Alert severity="info" sx={{ m: 2 }}>
                No products found. Try adjusting your filters.
            </Alert>
        )
    }

    return (
        <TableContainer component={Paper} elevation={0} sx={containerSx}>
            <Table sx={{ tableLayout: 'fixed', minWidth: 900 }}>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.background.default,
                                0.75
                            ),
                            '& th': {
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                        }}
                    >
                        <TableCell sx={{ width: 80 }}>
                            <Typography
                                variant="caption"
                                sx={headerTypographySx}
                            >
                                Image
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ width: '30%' }}>
                            <TableSortLabel
                                active={sortField === 'title'}
                                direction={
                                    sortField === 'title' ? sortOrder : 'asc'
                                }
                                onClick={() => setSorting('title')}
                                sx={sortLabelSx}
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
                                sx={sortLabelSx}
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
                                sx={sortLabelSx}
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
                                sx={sortLabelSx}
                            >
                                Stock
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right" sx={{ width: 140 }}>
                            <Typography
                                variant="caption"
                                sx={headerTypographySx}
                            >
                                Actions
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRowProduct key={product.id} product={product} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
