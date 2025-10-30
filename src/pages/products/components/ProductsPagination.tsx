import {
    Box,
    Pagination,
    Select,
    MenuItem,
    Typography,
    FormControl,
    Paper,
    Grid,
} from '@mui/material'
import {useProdStore} from '@stores/prodStore'


export default function ProductsPagination({
    totalItems,
    page,
    rowsPerPage,
}: {
    totalItems: number
    page: number
    rowsPerPage: number
}) {

    // Calculate total filtered items

    const totalPages = Math.ceil(totalItems / rowsPerPage)
    const startItem = (page - 1) * rowsPerPage + 1
    const endItem = Math.min(page * rowsPerPage, totalItems)
    const setCurrentPage = useProdStore().setCurrentPage
    const setRowsPerPage = useProdStore().setRowsPerPage

    return (
        <Paper sx={{ mt: 3, p: 2 }}>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
            >
                {/* Left side - Rows per page */}
                <Grid size={{ xs: 12, sm: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Rows per page:
                        </Typography>
                        <FormControl size="small">
                            <Select
                                value={rowsPerPage}
                                sx={{ minWidth: 70 }}
                                onChange={(e) => setRowsPerPage(e.target.value as number)}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="body2" color="text.secondary">
                            {startItem}-{endItem} of {totalItems}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', sm: 'flex-end' },
                        }}
                    >
                        <Pagination
                            count={totalPages}
                            siblingCount={0}
                            boundaryCount={1}
                            size='small'
                            page={page}
                            onChange={(_, value) => setCurrentPage(value)}
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
