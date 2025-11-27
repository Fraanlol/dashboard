import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Avatar,
    Tooltip,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
} from '@mui/material'
import {
    NotificationsNone,
    Notifications,
    Dashboard,
    Settings,
    Search,
    Logout,
    Person,
} from '@mui/icons-material'
import Popover from '@mui/material/Popover'
import { useThemeMode } from '../theme/ThemeProvider'
import ThemeControls from './ThemeControls'
import LanguageSwitcher from './LanguageSwitcher'
import Breadcrumbs from './Breadcrumbs'
import { useGlobalSearchStore } from '@stores/globalSearchStore'
import GlobalSearch from './GlobalSearch'
import { useAuthStore } from '@stores/authStore'
import { useNotificationStore } from '@stores/notificationStore'
import { useTranslation } from 'react-i18next'

interface HeaderProps {
    title: string
    children: React.ReactNode
}

const Header = ({ title, children }: HeaderProps) => {
    const { mode } = useThemeMode()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const [userMenuAnchor, setUserMenuAnchor] =
        React.useState<HTMLElement | null>(null)
    const openSearch = useGlobalSearchStore((state) => state.openSearch)
    const user = useAuthStore((state) => state.user)
    const signOut = useAuthStore((state) => state.signOut)
    const showNotification = useNotificationStore((state) => state.show)
    const { t } = useTranslation()

    const openPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const closePopover = () => setAnchorEl(null)

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget)
    }

    const handleUserMenuClose = () => setUserMenuAnchor(null)

    const handleLogout = async () => {
        try {
            await signOut()
            showNotification(t('userMenu.logoutSuccess'), 'success')
            navigate('/login')
        } catch (error) {
            showNotification(t('userMenu.logoutError'), 'error')
        }
        handleUserMenuClose()
    }

    const popoverOpen = Boolean(anchorEl)
    const userMenuOpen = Boolean(userMenuAnchor)

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backdropFilter: 'blur(8px)',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'rgba(18, 18, 18, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)',
                borderBottom: 1,
                borderColor: 'divider',
                color: 'text.primary',
            }}
        >
            <Toolbar>
                {children}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Dashboard sx={{ color: 'primary.main' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 600,
                                letterSpacing: '-0.5px',
                                color: 'text.primary',
                                display: { xs: 'none', sm: 'block' },
                            }}
                        >
                            {title}
                        </Typography>
                        <Breadcrumbs />
                    </Box>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Tooltip
                        title={`${t('header.searchButton')} (${t('header.searchShortcut')})`}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<Search />}
                            onClick={openSearch}
                            sx={{
                                borderRadius: 3,
                                textTransform: 'none',
                                borderColor: 'divider',
                                px: 2.5,
                                py: 0.75,
                                display: { xs: 'none', sm: 'flex' },
                                fontWeight: 500,
                                color: 'text.primary',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(144, 202, 249, 0.08)'
                                            : 'rgba(25, 118, 210, 0.04)',
                                },
                            }}
                        >
                            {t('app.searchPlaceholder')}
                            <Box
                                component="kbd"
                                sx={{
                                    ml: 1,
                                    px: 0.75,
                                    py: 0.25,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    borderRadius: 0.5,
                                    border: (theme) =>
                                        `1px solid ${theme.palette.divider}`,
                                    bgcolor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.05)'
                                            : 'rgba(0, 0, 0, 0.02)',
                                    color: 'text.secondary',
                                }}
                            >
                                {t('header.searchShortcut')}
                            </Box>
                        </Button>
                    </Tooltip>

                    <Tooltip title={t('header.searchButton')}>
                        <IconButton
                            onClick={openSearch}
                            sx={{
                                display: { xs: 'flex', sm: 'none' },
                                color: 'text.primary',
                            }}
                        >
                            <Search />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={t('header.notifications')}>
                        <IconButton
                            color="inherit"
                            aria-label={t('header.notifications')}
                        >
                            {mode === 'light' ? (
                                <NotificationsNone />
                            ) : (
                                <Notifications />
                            )}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={t('header.themeSettings')}>
                        <IconButton
                            color="inherit"
                            onClick={openPopover}
                            aria-label={t('header.themeSettings')}
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

                    <LanguageSwitcher />

                    <Tooltip title={t('header.account')}>
                        <IconButton
                            onClick={handleUserMenuOpen}
                            sx={{
                                p: 0,
                                border: 2,
                                borderColor: 'primary.main',
                                '&:hover': {
                                    boxShadow: (theme) =>
                                        `0 0 0 3px ${theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.15)' : 'rgba(25, 118, 210, 0.15)'}`,
                                },
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: 'primary.main',
                                    fontWeight: 600,
                                }}
                            >
                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={userMenuAnchor}
                        open={userMenuOpen}
                        onClose={handleUserMenuClose}
                        onClick={handleUserMenuClose}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                    >
                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography variant="body2" fontWeight={600}>
                                {user?.email}
                            </Typography>
                        </Box>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                handleUserMenuClose()
                                navigate('/profile')
                            }}
                        >
                            <ListItemIcon>
                                <Person fontSize="small" />
                            </ListItemIcon>
                            {t('userMenu.profile')}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            {t('userMenu.logout')}
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>

            <GlobalSearch />
        </AppBar>
    )
}

export default Header
