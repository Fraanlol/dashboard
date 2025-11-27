import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Box,
    Grid,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

interface Transaction {
    id: string
    userName: string
    userAvatar?: string
    date: string
    amount: number
    status: string
    badgeColor?:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
}

const currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
})

function getInitials(name: string) {
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
}

function formatDate(iso: string) {
    try {
        const d = new Date(iso)
        return d.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        })
    } catch {
        return iso
    }
}

export default function Transactions({ data }: { data?: Transaction[] }) {
    const theme = useTheme()
    const { t } = useTranslation()

    const sampleData: Transaction[] = useMemo(
        () => [
            {
                id: 'TXN-1001',
                userName: 'María López',
                date: '2025-10-24',
                amount: 129.99,
                status: t('dashboard.recentTransactions.statusValues.approved'),
                badgeColor: 'success',
            },
            {
                id: 'TXN-1002',
                userName: 'Jorge Pérez',
                date: '2025-10-23',
                amount: 49.5,
                status: t('dashboard.recentTransactions.statusValues.pending'),
                badgeColor: 'warning',
            },
            {
                id: 'TXN-1003',
                userName: 'Ana Gómez',
                date: '2025-10-22',
                amount: 299,
                status: t('dashboard.recentTransactions.statusValues.declined'),
                badgeColor: 'error',
            },
            {
                id: 'TXN-1004',
                userName: 'Luis Fernández',
                date: '2025-10-21',
                amount: 19.99,
                status: t('dashboard.recentTransactions.statusValues.approved'),
                badgeColor: 'success',
            },
            {
                id: 'TXN-1005',
                userName: 'Carmen Ruiz',
                date: '2025-10-20',
                amount: 75.0,
                status: t('dashboard.recentTransactions.statusValues.pending'),
                badgeColor: 'warning',
            },
            {
                id: 'TXN-1006',
                userName: 'Elena Martínez',
                date: '2025-10-19',
                amount: 150.0,
                status: t('dashboard.recentTransactions.statusValues.approved'),
                badgeColor: 'success',
            },
            {
                id: 'TXN-1007',
                userName: 'David Sánchez',
                date: '2025-10-18',
                amount: 200.0,
                status: t('dashboard.recentTransactions.statusValues.declined'),
                badgeColor: 'error',
            },
            {
                id: 'TXN-1008',
                userName: 'Laura Torres',
                date: '2025-10-17',
                amount: 120.0,
                status: t('dashboard.recentTransactions.statusValues.approved'),
                badgeColor: 'success',
            },
        ],
        [t]
    )

    const transactions = data || sampleData

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h6"
                sx={{ mb: 2, px: 2, fontWeight: 600, color: 'text.primary' }}
            >
                {t('dashboard.recentTransactions.title')}
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                }}
            >
                {transactions.map((transaction) => (
                    <Box
                        key={transaction.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 2,
                            px: 2,
                            borderBottom: 1,
                            borderColor: 'divider',
                            '&:last-child': { borderBottom: 0 },
                            '&:active': {
                                bgcolor: 'action.hover',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                flex: 1,
                                minWidth: 0,
                            }}
                        >
                            <Avatar
                                src={transaction.userAvatar}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: 'primary.light',
                                    color: 'primary.main',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                }}
                            >
                                {getInitials(transaction.userName)}
                            </Avatar>
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    noWrap
                                    sx={{ color: 'text.primary' }}
                                >
                                    {transaction.userName}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {formatDate(transaction.date)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ textAlign: 'right', ml: 1 }}>
                            <Typography variant="body2" fontWeight={700} noWrap>
                                {currencyFormatter.format(transaction.amount)}
                            </Typography>
                            <Chip
                                label={transaction.status}
                                color={transaction.badgeColor}
                                size="small"
                                sx={{
                                    height: 20,
                                    fontSize: '0.65rem',
                                    mt: 0.5,
                                    '& .MuiChip-label': { px: 1 },
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
