import React from 'react'
import { Container, Typography, Box, Paper, Grid } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { ThemeControls } from '../theme'

const SettingsPage = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Settings sx={{ mr: 2, fontSize: 32 }} />
                <Typography variant="h4" component="h1">
                    Configuración
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            🎨 Apariencia
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Personaliza el tema de tu dashboard
                        </Typography>
                        <ThemeControls />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            ⚙️ Otras Configuraciones
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Próximamente: configuraciones adicionales como
                            idioma, notificaciones, etc.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            📊 Información del Sistema
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Dashboard versión 1.0.0 | Material-UI v7 | React 19
                            | Zustand para state management
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SettingsPage
