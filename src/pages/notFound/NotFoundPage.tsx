import { useNavigate } from 'react-router-dom'
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function NotFoundPage() {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }

    const handleGoBack = () => {
        navigate(-1)
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
                    {/* 404 Illustration */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: 'primary.main',
                                borderRadius: '50%',
                                p: 4,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <SearchOffIcon
                                sx={{
                                    fontSize: 100,
                                    color: 'white',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* 404 Number */}
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontSize: { xs: '6rem', md: '8rem' },
                            fontWeight: 900,
                            color: 'primary.main',
                            mb: 2,
                            lineHeight: 1,
                        }}
                    >
                        404
                    </Typography>

                    {/* Error Message */}
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        fontWeight={700}
                    >
                        Page Not Found
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                    >
                        The page you're looking for doesn't exist or has been
                        moved.
                        <br />
                        Let's get you back on track!
                    </Typography>

                    {/* Action Buttons */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleGoBack}
                        >
                            Go Back
                        </Button>
                        <Button
                            variant="contained"
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
                        Lost? Try using the navigation menu or search bar.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    )
}
