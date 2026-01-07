import MainLayout from '@layout/mainLayout'
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material'
import AddProductButton from './components/AddProductButton'
import ProductsKPI from './components/ProductsKPI'
import ProductsSearch from './components/ProductsSearch'
import ProductsFilterSidebar from './components/ProductsFilterSidebar'
import ProductsTable from './components/ProductsTable'
import ProductsPagination from './components/ProductsPagination'
import ProductModal from '@components/ProductModal'
import DeleteConfirmDialog from '@components/DeleteConfirmDialog'
import { getCategories, getProducts, ProductsResponse } from '@api/products-api'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useProdStore } from '@stores/prodStore'
import { useMemo, useEffect } from 'react'
import { useProductMutations } from '../../hooks/useProductMutations'
import { useProductModalStore } from '@stores/productModalStore'
import { useDeleteDialogStore } from '@stores/productModalStore'
import { fadeSlideIn } from '@styles/animations'
import { useTranslation } from 'react-i18next'

export default function Products() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation()

    const currentPage = useProdStore((state) => state.currentPage)
    const rowsPerPage = useProdStore((state) => state.rowsPerPage)
    const categoryFilter = useProdStore((state) => state.currentCategory)
    const sortField = useProdStore((state) => state.sortField)
    const sortOrder = useProdStore((state) => state.sortOrder)

    const { createProduct, updateProduct, deleteProduct } =
        useProductMutations()

    const setOnSubmit = useProductModalStore((state) => state.setOnSubmit)
    const setOnDelete = useDeleteDialogStore((state) => state.setOnDelete)

    useEffect(() => {
        setOnSubmit((data, mode) => {
            if (mode === 'create') {
                createProduct(data)
            } else if (mode === 'edit') {
                updateProduct(data)
            }
        })

        setOnDelete((id: number) => {
            deleteProduct(id)
        })
    }, [createProduct, updateProduct, deleteProduct, setOnSubmit, setOnDelete])

    const { data, isLoading, isError, refetch } = useQuery<ProductsResponse>({
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

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue)
                return sortOrder === 'asc' ? comparison : -comparison
            }

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
            {/* Header with Title */}
            <Box
                sx={[
                    fadeSlideIn(),
                    {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 3,
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                    },
                ]}
            >
                <div className="text-gray-600">
                    <h1 className="fade-in font-bold text-xl">
                        {t('products.title')}
                    </h1>
                    <p className="fade-in text-sm">{t('products.subtitle')}</p>
                </div>
            </Box>

            {/* KPI Cards */}
            <Box sx={[fadeSlideIn(0.05), { mb: 3 }]}>
                <ProductsKPI />
            </Box>

            {/* Main Content: Sidebar + Products */}
            <Grid container spacing={3}>
                {/* Filter Sidebar - Desktop: sticky left sidebar, Mobile: drawer button */}
                <Grid size={{ xs: 12, md: 3 }} sx={fadeSlideIn(0.08)}>
                    <ProductsFilterSidebar
                        categories={categoriesList}
                        isLoading={catsLoading}
                    />
                </Grid>

                {/* Products Content */}
                <Grid size={{ xs: 12, md: 9 }} sx={fadeSlideIn(0.12)}>
                    {/* Search Bar */}
                    <Box sx={[fadeSlideIn(0.15), { mb: 3 }]}>
                        <ProductsSearch
                            products={sortedProducts}
                            isLoading={isLoading}
                        />
                    </Box>

                    {/* Products Table */}
                    <Box sx={fadeSlideIn(0.2)}>
                        <ProductsTable
                            products={paginatedProducts}
                            isLoading={isLoading}
                            isError={isError}
                            refetch={refetch}
                        />
                    </Box>

                    {/* Pagination */}
                    <Box sx={fadeSlideIn(0.25)}>
                        <ProductsPagination
                            totalItems={totalItems}
                            page={currentPage}
                            rowsPerPage={rowsPerPage}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Modals */}
            <ProductModal />
            <DeleteConfirmDialog />
            <AddProductButton products={sortedProducts} isLoading={isLoading} />
        </MainLayout>
    )
}
