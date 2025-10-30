import MainLayout from '@layout/mainLayout'
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material'
import AddProductButton from './components/AddProductButton'
import ProductsKPI from './components/ProductsKPI'
import ProductsSearch from './components/ProductsSearch'
import ProductsFilters from './components/ProductsFilters'
import ProductsTable from './components/ProductsTable'
import ProductsPagination from './components/ProductsPagination'
import { getProducts } from '@api/products-api'
import { useQuery } from '@tanstack/react-query'
import { ProductsResponse } from '@api/products-api'

export default function Products() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const { data, isLoading, isError } = useQuery<ProductsResponse>({
        queryKey: ['products'],
        queryFn: () => getProducts({ limit: '20' }),
    })

    let products = data?.products

    return (
        <MainLayout>
            <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <div className="text-gray-600">
                        <h1 className="fade-in font-bold text-xl">Products</h1>
                        <p className="fade-in text-sm">
                            Manage your product inventory
                        </p>
                    </div>
                </Grid>
                {!isMobile && (
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                            <AddProductButton />
                        </Box>
                    </Grid>
                )}
            </Grid>

            <ProductsKPI />
            <ProductsFilters />
            <ProductsSearch />
            <ProductsTable
                products={products}
                isLoading={isLoading}
                isError={isError}
            />
            <ProductsPagination />
            {isMobile && <AddProductButton />}
        </MainLayout>
    )
}
