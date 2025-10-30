import React from 'react'
import {
    Card,
    CardContent,
    Typography,
    Button,
    ButtonGroup,
    Box,
} from '@mui/material'
import {
    Brightness4,
    Brightness7,
    SettingsBrightness,
} from '@mui/icons-material'
import { useThemeMode } from '../theme/ThemeProvider'
import { useSystemThemeSync } from '../hooks/useSystemTheme'

const ThemeControls = () => {
    const { mode, toggleTheme, setTheme } = useThemeMode()
    const { syncWithSystem } = useSystemThemeSync()

    return (
        <Card sx={{ maxWidth: 400, m: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    🎨 Controles de Tema
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Modo actual:{' '}
                    <strong>{mode === 'light' ? 'Claro' : 'Oscuro'}</strong>
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <ButtonGroup variant="outlined" fullWidth>
                        <Button
                            startIcon={<Brightness7 />}
                            onClick={() => setTheme('light')}
                            variant={
                                mode === 'light' ? 'contained' : 'outlined'
                            }
                        >
                            Claro
                        </Button>
                        <Button
                            startIcon={<Brightness4 />}
                            onClick={() => setTheme('dark')}
                            variant={mode === 'dark' ? 'contained' : 'outlined'}
                        >
                            Oscuro
                        </Button>
                    </ButtonGroup>

                    <Button
                        startIcon={<SettingsBrightness />}
                        onClick={syncWithSystem}
                        variant="text"
                        size="small"
                    >
                        Usar preferencia del sistema
                    </Button>

                    <Button onClick={toggleTheme} variant="text" size="small">
                        🔄 Alternar tema
                    </Button>
                </Box>

                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 2, opacity: 0.7 }}
                >
                    💾 Tu preferencia se guarda automáticamente
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ThemeControls
