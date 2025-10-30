import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Avatar,
    Tooltip,
} from '@mui/material'
import {
    NotificationsNone,
    Notifications,
    Dashboard,
    Settings,
} from '@mui/icons-material'
import { useThemeMode } from '../theme/ThemeProvider'
import Popover from '@mui/material/Popover'
import ThemeControls from './ThemeControls'
import theme from '../theme/theme'

interface HeaderProps {
    title: string
    children: React.ReactNode
}

const Header = ({ title, children }: HeaderProps) => {
    const { mode, toggleTheme } = useThemeMode()
    const location = useLocation()
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

    const openPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const closePopover = () => setAnchorEl(null)

    const popoverOpen = Boolean(anchorEl)

    return (
        <AppBar position="static" elevation={1}>
            <Toolbar>
                {children}
                <Dashboard sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip
                        title={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>H</Avatar>
                    </Tooltip>

                    <Tooltip title="Notificaciones">
                        <IconButton color="inherit" aria-label="notificaciones">
                            {mode === 'light' ? (
                                <NotificationsNone />
                            ) : (
                                <Notifications />
                            )}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Ajustes de tema">
                        <IconButton
                            color="inherit"
                            onClick={openPopover}
                            aria-label="abrir ajustes"
                        >
                            <Settings />
                        </IconButton>
                    </Tooltip>

                    <Popover
                        open={popoverOpen}
                        anchorEl={anchorEl}
                        onClose={closePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <div style={{ maxWidth: 420, minWidth: 280 }}>
                            <ThemeControls />
                        </div>
                    </Popover>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
