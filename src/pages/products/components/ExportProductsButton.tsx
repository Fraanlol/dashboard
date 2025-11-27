import { Button } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import {
    exportToCSV,
    formatProductsForExport,
} from '../../../utils/exportToCSV'
import { useTranslation } from 'react-i18next'
import { Product } from '../../../stores/prodStore'

interface ExportProductsButtonProps {
    products: Product[]
    disabled?: boolean
}

export default function ExportProductsButton({
    products,
    disabled = false,
}: ExportProductsButtonProps) {
    const { t } = useTranslation()

    const handleExport = () => {
        if (products.length === 0) {
            alert(t('products.export.noProducts'))
            return
        }

        const formattedData = formatProductsForExport(products)
        exportToCSV(formattedData, 'products')
    }

    return (
        <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={disabled || products.length === 0}
            sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
            }}
        >
            {t('products.export.button')}
        </Button>
    )
}
