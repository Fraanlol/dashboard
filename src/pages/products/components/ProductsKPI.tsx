import { Grid, Paper, Box, Typography, Chip } from '@mui/material'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import CategoryIcon from '@mui/icons-material/Category'
import WarningIcon from '@mui/icons-material/Warning'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

export default function ProductsKPI() {
    return (
        <Grid container spacing={2} sx={{ mb: 4 }}>
            {/* Card grande: Total Products */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    sx={{
                        p: 3,
                        height: '100%',
                        background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ opacity: 0.9, mb: 1 }}
                            >
                                Total Products
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 700 }}>
                                1,234
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                borderRadius: 2,
                                p: 1.5,
                            }}
                        >
                            <Inventory2Icon sx={{ fontSize: 40 }} />
                        </Box>
                    </Box>
                    <Chip
                        label="+5% vs last month"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 600,
                        }}
                    />
                </Paper>
            </Grid>

            {/* Card grande: Total Value */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    sx={{
                        p: 3,
                        height: '100%',
                        background:
                            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ opacity: 0.9, mb: 1 }}
                            >
                                Total Value
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 700 }}>
                                $45.2K
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                borderRadius: 2,
                                p: 1.5,
                            }}
                        >
                            <AttachMoneyIcon sx={{ fontSize: 40 }} />
                        </Box>
                    </Box>
                    <Chip
                        label="+8% vs last month"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 600,
                        }}
                    />
                </Paper>
            </Grid>

            {/* Cards pequeñas */}
            <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                    sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'info.main',
                            color: 'white',
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                        }}
                    >
                        <CategoryIcon />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        12
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Categories
                    </Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                    sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'warning.main',
                            color: 'white',
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                        }}
                    >
                        <WarningIcon />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        23
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Low Stock
                    </Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'success.main',
                            color: 'white',
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <Inventory2Icon />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Active Products
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            1,211
                        </Typography>
                    </Box>
                    <Chip
                        label="98%"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}
