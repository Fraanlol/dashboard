import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Switch,
    FormControlLabel,
    Box,
    Container,
    Card,
    CardContent,
    Button,
    Grid,
    Chip,
    Paper,
} from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useThemeMode } from '../theme/ThemeProvider'

const ThemeExample: React.FC = () => {
    const { mode, toggleTheme } = useThemeMode()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard Theme Example
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={mode === 'dark'}
                                onChange={toggleTheme}
                            />
                        }
                        label="Dark Mode"
                    />
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    gutterBottom
                                >
                                    Theme Showcase
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    paragraph
                                >
                                    Este es un ejemplo de cómo se ve el theme
                                    personalizado en acción. Prueba cambiar
                                    entre modo claro y oscuro usando el switch
                                    arriba.
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: 'flex',
                                        gap: 1,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Button variant="contained" color="primary">
                                        Primary
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Secondary
                                    </Button>
                                    <Button variant="outlined" color="primary">
                                        Outlined
                                    </Button>
                                    <Button variant="text" color="primary">
                                        Text
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: 'flex',
                                        gap: 1,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Chip label="Success" color="success" />
                                    <Chip label="Error" color="error" />
                                    <Chip label="Warning" color="warning" />
                                    <Chip label="Info" color="info" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                Typography Scale
                            </Typography>
                            <Typography variant="h1" gutterBottom>
                                Heading 1
                            </Typography>
                            <Typography variant="h2" gutterBottom>
                                Heading 2
                            </Typography>
                            <Typography variant="h3" gutterBottom>
                                Heading 3
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                Heading 4
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                Heading 5
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Heading 6
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Body 1 - Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Body 2 - Smaller body text for secondary
                                information.
                            </Typography>
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                            >
                                Caption text
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default ThemeExample
