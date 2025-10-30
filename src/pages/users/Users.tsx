import MainLayout from '@layout/mainLayout'
import { Box, useMediaQuery, useTheme, Fab, Grid } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import UsersKPI from './components/UsersKPI'
import UsersSearch from './components/UsersSearch'
import UsersFilters from './components/UsersFilters'
import UsersTable from './components/UsersTable'
import UsersPagination from './components/UsersPagination'

export default function Users() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <MainLayout>
            <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <div className="text-gray-600">
                        <h1 className="fade-in font-bold text-xl">Products</h1>
                        <p className="fade-in text-sm">
                            Manage and monitor your user base
                        </p>
                    </div>
                </Grid>
            </Grid>
            <UsersKPI />
            <UsersFilters />
            <UsersSearch />
            <UsersTable />
            <UsersPagination />
        </MainLayout>
    )
}
