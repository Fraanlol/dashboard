import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff, Dashboard } from '@mui/icons-material'
import { useAuthStore } from '@stores/authStore'
import { useNotificationStore } from '@stores/notificationStore'
import { useTranslation } from 'react-i18next'

export default function RegisterPage() {
    const navigate = useNavigate()
    const signUp = useAuthStore((state) => state.signUp)
    const loading = useAuthStore((state) => state.loading)
    const showNotification = useNotificationStore((state) => state.show)
    const { t } = useTranslation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validations
        if (!email || !password || !confirmPassword) {
            setError(t('auth.errors.fillFields'))
            return
        }

        if (password.length < 6) {
            setError(t('auth.register.errors.passwordLength'))
            return
        }

        if (password !== confirmPassword) {
            setError(t('auth.register.errors.passwordMismatch'))
            return
        }

        try {
            await signUp(email, password)
            showNotification(t('auth.register.success'), 'success')
            navigate('/login')
        } catch (err: unknown) {
            const error = err as Error
            setError(error.message || t('auth.register.error'))
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={10}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {/* Logo/Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Dashboard
                            sx={{ fontSize: 60, color: 'primary.main', mb: 2 }}
                        />
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            {t('auth.register.title')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('auth.register.subtitle')}
                        </Typography>
                    </Box>

                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label={t('auth.labels.email')}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            autoComplete="email"
                            autoFocus
                            disabled={loading}
                        />

                        <TextField
                            fullWidth
                            label={t('auth.labels.password')}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            autoComplete="new-password"
                            disabled={loading}
                            helperText={t('auth.register.passwordHelper')}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label={t('auth.register.confirmPassword')}
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            margin="normal"
                            autoComplete="new-password"
                            disabled={loading}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                <>{t('auth.register.button')}</>
                            )}
                        </Button>

                        {/* Links */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="primary"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Sign In
                                    </Typography>
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}
