import { useNavigate } from 'react-router-dom'
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import RefreshIcon from '@mui/icons-material/Refresh'
import HomeIcon from '@mui/icons-material/Home'

export default function ServerErrorPage() {
    const navigate = useNavigate()

    const handleRetry = () => {
        window.location.reload()
    }

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                p: 2,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={3}
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        borderRadius: 3,
                    }}
                >
                    {/* 500 Illustration */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: 'error.main',
                                borderRadius: '50%',
                                p: 4,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ErrorIcon
                                sx={{
                                    fontSize: 100,
                                    color: 'white',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* 500 Number */}
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontSize: { xs: '6rem', md: '8rem' },
                            fontWeight: 900,
                            color: 'error.main',
                            mb: 2,
                            lineHeight: 1,
                        }}
                    >
                        500
                    </Typography>

                    {/* Error Message */}
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        fontWeight={700}
                    >
                        Internal Server Error
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                    >
                        Something went wrong on our end.
                        <br />
                        We're working to fix the issue. Please try again later.
                    </Typography>

                    {/* Action Buttons */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<RefreshIcon />}
                            onClick={handleRetry}
                        >
                            Retry
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<HomeIcon />}
                            onClick={handleGoHome}
                        >
                            Back to Home
                        </Button>
                    </Stack>

                    {/* Help Text */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 4 }}
                    >
                        Error Code: 500 | Our team has been notified.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    )
}
