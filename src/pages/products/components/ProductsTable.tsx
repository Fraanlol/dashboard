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
    CircularProgress,
    Typography,
    Alert,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useState, useMemo } from 'react'
import { Product } from '@stores/prodStore'

export default function ProductsTable({
    products,
    isLoading,
    isError,
}: {
    products: Product[]
    isLoading: boolean
    isError: boolean
}) {
    if (isError) {
        return <Typography color="error">Error loading products.</Typography>
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    if (!products || products.length === 0) {
        return (
            <Alert severity="info" sx={{ m: 2 }}>
                No products found
            </Alert>
        )
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                overflowX: 'scroll',
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>
                            <TableSortLabel>Name</TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel>Category</TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel>Price</TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel>Stock</TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel>Status</TableSortLabel>
                        </TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(
                        ({
                            id,
                            title,
                            category,
                            price,
                            stock,
                            status,
                            thumbnail,
                        }) => (
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
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                    >
                                        {title}
                                    </Typography>
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
                                    <Chip
                                        label={stock}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={status}
                                        size="small"
                                        color={
                                            status === 'active'
                                                ? 'success'
                                                : 'default'
                                        }
                                    />
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
