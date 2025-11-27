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
import { useTranslation } from 'react-i18next'

const ThemeControls = () => {
    const { mode, toggleTheme, setTheme } = useThemeMode()
    const { syncWithSystem } = useSystemThemeSync()
    const { t } = useTranslation()

    return (
        <Card sx={{ maxWidth: 400, m: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {t('theme.controls.title')}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {t('theme.controls.currentMode')}:{' '}
                    <strong>
                        {mode === 'light'
                            ? t('theme.controls.light')
                            : t('theme.controls.dark')}
                    </strong>
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
                            {t('theme.controls.light')}
                        </Button>
                        <Button
                            startIcon={<Brightness4 />}
                            onClick={() => setTheme('dark')}
                            variant={mode === 'dark' ? 'contained' : 'outlined'}
                        >
                            {t('theme.controls.dark')}
                        </Button>
                    </ButtonGroup>

                    <Button
                        startIcon={<SettingsBrightness />}
                        onClick={syncWithSystem}
                        variant="text"
                        size="small"
                    >
                        {t('theme.controls.useSystem')}
                    </Button>

                    <Button onClick={toggleTheme} variant="text" size="small">
                        {t('theme.controls.toggle')}
                    </Button>
                </Box>

                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 2, opacity: 0.7 }}
                >
                    {t('theme.controls.saved')}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ThemeControls
