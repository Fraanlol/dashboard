import {
    Box,
    FormControl,
    MenuItem,
    Pagination,
    Paper,
    Select,
    SelectChangeEvent,
    Typography,
    useTheme,
    Grid,
} from '@mui/material'
import { useUsersStore } from '@stores/usersStore'
import { useTranslation } from 'react-i18next'

const UsersPagination = ({
    totalUsers,
    page,
    rowsPerPage,
}: {
    totalUsers: number
    page: number
    rowsPerPage: number
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const setRowsPerPage = useUsersStore((state) => state.setRowsPerPage)
    const setCurrentPage = useUsersStore((state) => state.setCurrentPage)

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
            }}
        >
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid size={{ xs: 12, sm: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {t('users.pagination.rowsPerPage')}
                        </Typography>
                        <FormControl size="small">
                            <Select
                                value={rowsPerPage}
                                sx={{ minWidth: 80 }}
                                onChange={(k) =>
                                    setRowsPerPage(k.target.value as number)
                                }
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, totalUsers)} ${t('users.pagination.of')} ${totalUsers}`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 'auto' }}
                    sx={{ ml: 'auto' }}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Pagination
                        count={
                            rowsPerPage === 0
                                ? 0
                                : Math.ceil(totalUsers / rowsPerPage)
                        }
                        page={page}
                        color="primary"
                        shape="rounded"
                        sx={{
                            ul: { justifyContent: 'center' },
                        }}
                        onChange={(_, value) => setCurrentPage(value)}
                        siblingCount={1}
                        boundaryCount={1}
                        showFirstButton
                        showLastButton
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default UsersPagination
