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

type Status = 'Approved' | 'Pending' | 'Declined'

interface Transaction {
    id: string
    userName: string
    userAvatar?: string
    date: string
    amount: number
    status: Status
}

const sampleData: Transaction[] = [
    {
        id: 'TXN-1001',
        userName: 'María López',
        date: '2025-10-24',
        amount: 129.99,
        status: 'Approved',
    },
    {
        id: 'TXN-1002',
        userName: 'Jorge Pérez',
        date: '2025-10-23',
        amount: 49.5,
        status: 'Pending',
    },
    {
        id: 'TXN-1003',
        userName: 'Ana Gómez',
        date: '2025-10-22',
        amount: 299,
        status: 'Declined',
    },
    {
        id: 'TXN-1004',
        userName: 'Luis Fernández',
        date: '2025-10-21',
        amount: 19.99,
        status: 'Approved',
    },
]

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

function getStatusColor(
    status: Status
): 'success' | 'warning' | 'error' | 'default' {
    switch (status) {
        case 'Approved':
            return 'success'
        case 'Pending':
            return 'warning'
        case 'Declined':
            return 'error'
        default:
            return 'default'
    }
}

export default function Transactions({
    data = sampleData,
}: {
    data?: Transaction[]
}) {
    const theme = useTheme()

    return (
        <Grid container direction="column" spacing={2} className="flex-2">
            <Box sx={{ height: 'fit-content' }}>
                <div className=" text-gray-600">
                    <h2 className="fade-in font-bold text-lg">
                        Recent Transactions
                    </h2>
                </div>
            </Box>

            <TableContainer sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Id
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Usuario
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Fecha
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Monto
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Estado
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((transaction) => (
                            <TableRow
                                key={transaction.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {transaction.id}
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                        }}
                                    >
                                        <Avatar
                                            src={transaction.userAvatar}
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                bgcolor: 'primary.light',
                                                color: 'primary.main',
                                                fontSize: '0.875rem',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {getInitials(transaction.userName)}
                                        </Avatar>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {transaction.userName}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {formatDate(transaction.date)}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                    }}
                                >
                                    {currencyFormatter.format(
                                        transaction.amount
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={transaction.status}
                                        color={getStatusColor(
                                            transaction.status
                                        )}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}
