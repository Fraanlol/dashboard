import DownloadIcon from '@mui/icons-material/Download'
import AddIcon from '@mui/icons-material/Add'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Product } from '@stores/prodStore'
import { useProductModalStore } from '@stores/productModalStore'
import {
    exportToCSV,
    formatProductsForExport,
} from '../../../utils/exportToCSV'

interface AddProductButtonProps {
    products: Product[]
    isLoading: boolean
}

export default function AddProductButton({
    products,
    isLoading,
}: AddProductButtonProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation()
    const openCreateModal = useProductModalStore(
        (state) => state.openCreateModal
    )

    if (!isMobile) return null

    const handleExport = () => {
        if (products.length === 0 || isLoading) {
            alert(t('products.export.noProducts'))
            return
        }

        const formattedData = formatProductsForExport(products)
        exportToCSV(formattedData, 'products')
    }

    return (
        <SpeedDial
            ariaLabel={t('products.actions.ariaLabel')}
            icon={<SpeedDialIcon openIcon={<AddIcon />} />}
            FabProps={{ color: 'primary' }}
            sx={{ position: 'fixed', bottom: 24, right: 24 }}
        >
            <SpeedDialAction
                icon={<AddIcon />}
                tooltipTitle={t('products.actions.addProduct')}
                onClick={openCreateModal}
            />
            <SpeedDialAction
                icon={<DownloadIcon />}
                tooltipTitle={t('products.actions.exportCSV')}
                onClick={handleExport}
                FabProps={{ disabled: isLoading || products.length === 0 }}
            />
        </SpeedDial>
    )
}
