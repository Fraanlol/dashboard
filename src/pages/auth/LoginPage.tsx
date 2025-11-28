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
    AlertTitle,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff, Dashboard } from '@mui/icons-material'
import { useAuthStore } from '@stores/authStore'
import { useNotificationStore } from '@stores/notificationStore'
import { DEMO_CONFIG } from '@lib/demo'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@components/LanguageSwitcher'

export default function LoginPage() {
    const navigate = useNavigate()
    const signIn = useAuthStore((state) => state.signIn)
    const loading = useAuthStore((state) => state.loading)
    const showNotification = useNotificationStore((state) => state.show)
    const { t } = useTranslation()

    const [email, setEmail] = useState(
        DEMO_CONFIG.enabled ? DEMO_CONFIG.demoEmail : ''
    )
    const [password, setPassword] = useState(
        DEMO_CONFIG.enabled ? 'demo123' : ''
    )

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email || !password) {
            setError(t('auth.errors.fillFields'))
            return
        }

        try {
            await signIn(email, password)
            showNotification(t('auth.welcome'), 'success')
            navigate('/')
        } catch (err: unknown) {
            const error = err as Error
            setError(error.message || t('auth.errors.invalidCredentials'))
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
                            {t('auth.title')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('auth.subtitle')}
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
                            placeholder={t('auth.placeholders.email')}
                        />

                        <TextField
                            fullWidth
                            label={t('auth.labels.password')}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            autoComplete="current-password"
                            disabled={loading}
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
                                t('auth.button.signIn')
                            )}
                        </Button>

                        {/* Links */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}
                        >
                            <Typography variant="body2">
                                {t('auth.noAccount')}{' '}
                                <Link
                                    to="/register"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="primary"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {t('auth.signUp')}
                                    </Typography>
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                    {/* Language Switcher - Positioned at top right */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            my: 2,
                        }}
                    >
                        <LanguageSwitcher />
                    </Box>
                </Paper>

                {/* Demo Credentials */}
                {DEMO_CONFIG.enabled && (
                    <Paper
                        sx={{
                            mt: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: 'info.main',
                            color: 'white',
                        }}
                    >
                        <Alert severity="info">
                            <AlertTitle>{t('auth.demo.title')}</AlertTitle>
                            <Typography variant="body2">
                                <strong>{t('auth.demo.email')}:</strong>{' '}
                                {DEMO_CONFIG.demoEmail}
                                <br />
                                <strong>{t('auth.demo.password')}:</strong>{' '}
                                demo123
                            </Typography>
                        </Alert>
                    </Paper>
                )}
            </Container>
        </Box>
    )
}
