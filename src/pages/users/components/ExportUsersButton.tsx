import { Button } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { exportToCSV, formatUsersForExport } from '../../../utils/exportToCSV'
import { useTranslation } from 'react-i18next'
import { User } from '../../../stores/usersStore'

interface ExportUsersButtonProps {
    users: User[]
    disabled?: boolean
}

export default function ExportUsersButton({
    users,
    disabled = false,
}: ExportUsersButtonProps) {
    const { t } = useTranslation()

    const handleExport = () => {
        if (users.length === 0) {
            alert(t('users.export.noUsers'))
            return
        }

        const formattedData = formatUsersForExport(users)
        exportToCSV(formattedData, 'users')
    }

    return (
        <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={disabled || users.length === 0}
            sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
            }}
        >
            {t('users.export.button')}
        </Button>
    )
}
