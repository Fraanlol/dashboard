import MainLayout from '@layout/mainLayout'
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material'
import AddProductButton from './components/AddProductButton'
import ProductsKPI from './components/ProductsKPI'
import ProductsSearch from './components/ProductsSearch'
import ProductsFilters from './components/ProductsFilters'
import ProductsTable from './components/ProductsTable'
import ProductsPagination from './components/ProductsPagination'
import { getCategories, getProducts, ProductsResponse } from '@api/products-api'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useProdStore } from '@stores/prodStore'
import { useMemo } from 'react'

export default function Products() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const currentPage = useProdStore((state) => state.currentPage)
    const rowsPerPage = useProdStore((state) => state.rowsPerPage)
    const categoryFilter = useProdStore((state) => state.currentCategory)
    const sortField = useProdStore((state) => state.sortField)
    const sortOrder = useProdStore((state) => state.sortOrder)

    const { data, isLoading, isError } = useQuery<ProductsResponse>({
        queryKey: ['products', categoryFilter],
        placeholderData: keepPreviousData,
        queryFn: () => {
            const baseParams = {
                limit: '0',
            }
            if (categoryFilter !== 'all') {
                return getProducts({
                    ...baseParams,
                    category: categoryFilter,
                })
            }
            return getProducts(baseParams)
        },
    })

    const { data: categoriesList, isLoading: catsLoading } = useQuery<string[]>(
        {
            queryKey: ['categories'],
            queryFn: () => getCategories(),
            staleTime: 1000 * 60 * 60 * 24,
            gcTime: Infinity,
        }
    )

    const searchQuery = useProdStore((state) => state.searchQuery)
    const filters = useProdStore((state) => state.filters)

    let products = data?.products || []

    const filteredProducts = useMemo(() => {
        const hasFilters =
            searchQuery.trim() ||
            (filters.stockStatus && filters.stockStatus !== 'all') ||
            (filters.priceRange && filters.priceRange !== 'all')

        if (!hasFilters) {
            return products
        }

        let filtered = [...products]
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (product) =>
                    product.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    product.category
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
        }

        if (filters.stockStatus && filters.stockStatus !== 'all') {
            filtered = filtered.filter((product) => {
                switch (filters.stockStatus) {
                    case 'in-stock':
                        return product.stock > 10
                    case 'low-stock':
                        return product.stock > 0 && product.stock <= 10
                    case 'out-of-stock':
                        return product.stock === 0
                    default:
                        return true
                }
            })
        }

        if (filters.priceRange && filters.priceRange !== 'all') {
            filtered = filtered.filter((product) => {
                switch (filters.priceRange) {
                    case 'under-50':
                        return product.price < 50
                    case '50-100':
                        return product.price >= 50 && product.price <= 100
                    case '100-500':
                        return product.price > 100 && product.price <= 500
                    case 'over-500':
                        return product.price > 500
                    default:
                        return true
                }
            })
        }

        return filtered
    }, [products, searchQuery, filters])

    const sortedProducts = useMemo(() => {
        if (!sortField) return filteredProducts

        const sorted = [...filteredProducts]

        sorted.sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]

            // Handle string comparison
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue)
                return sortOrder === 'asc' ? comparison : -comparison
            }

            // Handle number comparison
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
            }

            return 0
        })

        return sorted
    }, [filteredProducts, sortField, sortOrder])
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage
        return sortedProducts.slice(startIndex, startIndex + rowsPerPage)
    }, [sortedProducts, currentPage, rowsPerPage])

    const totalItems = sortedProducts.length

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
            <ProductsFilters
                categories={categoriesList}
                isLoading={catsLoading}
            />
            <ProductsSearch />
            <ProductsTable
                products={paginatedProducts}
                isLoading={isLoading}
                isError={isError}
            />
            <ProductsPagination
                totalItems={totalItems}
                page={currentPage}
                rowsPerPage={rowsPerPage}
            />
            {isMobile && <AddProductButton />}
        </MainLayout>
    )
}
