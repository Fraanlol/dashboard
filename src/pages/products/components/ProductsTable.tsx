import { useMediaQuery, useTheme } from '@mui/material'
import { Product, useProdStore } from '@stores/prodStore'
import CardMobile from './productsTable/CardsMobile'
import TableDesktop from './productsTable/TableDesktop'

export default function ProductsTable({
    products,
    isLoading,
    isError,
}: {
    products: Product[]
    isLoading: boolean
    isError: boolean
}) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    if (isMobile) {
        return (
            <CardMobile
                products={products}
                isLoading={isLoading}
                isError={isError}
            />
        )
    }

    return (
        <TableDesktop
            products={products}
            isLoading={isLoading}
            isError={isError}
        />
    )
}
