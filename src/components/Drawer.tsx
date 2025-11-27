import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import Typography from '@mui/material/Typography'
import { alpha, useMediaQuery } from '@mui/material'

import { useDrawerStore } from '../stores/drawerStore'

import Header from './Header'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backfaceVisibility: 'hidden', // Fuerza aceleración GPU
    willChange: 'width',
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    backfaceVisibility: 'hidden', // Fuerza aceleración GPU
    willChange: 'width',
    [theme.breakpoints.down('sm')]: {
        width: `0px`,
    },
})

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1.5),
    ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}))

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            },
        },
    ],
}))

export default function MiniDrawer({
    children,
}: {
    children: React.ReactNode
}) {
    const theme = useTheme()
    const { open, toggleDrawer, closeDrawer } = useDrawerStore()
    const location = useLocation()
    const drawerRef = React.useRef<HTMLDivElement>(null)
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

    const { t } = useTranslation()

    const menuItems = [
        { key: 'nav.dashboard', icon: <DashboardIcon />, path: '/' },
        { key: 'nav.products', icon: <ShoppingCartIcon />, path: '/products' },
        { key: 'nav.users', icon: <PeopleIcon />, path: '/users' },
    ]

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/'
        }
        return location.pathname.startsWith(path)
    }

    // Cerrar drawer al hacer click fuera - SOLO en mobile
    const handleClickOutside = React.useCallback(
        (event: MouseEvent) => {
            if (
                drawerRef.current &&
                !drawerRef.current.contains(event.target as Node)
            ) {
                closeDrawer()
            }
        },
        [closeDrawer]
    )

    React.useEffect(() => {
        if (!isMobile || !open) return

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open, handleClickOutside, isMobile])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Header
                    title={t('app.title')}
                    children={
                        <IconButton
                            color="inherit"
                            aria-label={t('header.openDrawer')}
                            onClick={toggleDrawer}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 2,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                    }
                />
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
                className="absolute lg:[position:unset]"
                ref={drawerRef}
            >
                <DrawerHeader>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            opacity: open ? 1 : 0,
                            transition: 'opacity 0.2s',
                        }}
                    >
                        <DashboardIcon
                            sx={{
                                fontSize: 28,
                                color: 'primary.main',
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {t('nav.dashboard')}
                        </Typography>
                    </Box>
                    <IconButton onClick={closeDrawer}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ mb: 1 }} />
                <List>
                    {menuItems.map((item) => {
                        const active = isActive(item.path)
                        return (
                            <ListItem
                                key={item.key}
                                disablePadding
                                sx={{ display: 'block', px: 1 }}
                            >
                                <Link
                                    onClick={closeDrawer}
                                    to={item.path}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <ListItemButton
                                        sx={[
                                            {
                                                minHeight: 48,
                                                borderRadius: 2,
                                                mb: 0.5,
                                                transition: 'all 0.2s',
                                                position: 'relative',
                                                overflow: 'hidden',
                                            },
                                            open
                                                ? {
                                                      justifyContent: 'initial',
                                                      px: 2.5,
                                                  }
                                                : {
                                                      justifyContent: 'center',
                                                      px: 2,
                                                  },
                                            active && {
                                                bgcolor: alpha(
                                                    theme.palette.primary.main,
                                                    0.12
                                                ),
                                                color: 'primary.main',
                                                fontWeight: 600,
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: '20%',
                                                    height: '60%',
                                                    width: 3,
                                                    bgcolor: 'primary.main',
                                                    borderRadius: '0 4px 4px 0',
                                                },
                                                '&:hover': {
                                                    bgcolor: alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.18
                                                    ),
                                                },
                                            },
                                        ]}
                                    >
                                        <ListItemIcon
                                            sx={[
                                                {
                                                    minWidth: 0,
                                                    justifyContent: 'center',
                                                    color: active
                                                        ? 'primary.main'
                                                        : 'inherit',
                                                },
                                                open
                                                    ? {
                                                          mr: 2.5,
                                                      }
                                                    : {
                                                          mr: 'auto',
                                                      },
                                            ]}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={t(item.key)}
                                            primaryTypographyProps={{
                                                fontWeight: active ? 600 : 500,
                                                fontSize: '0.95rem',
                                            }}
                                            sx={[
                                                open
                                                    ? {
                                                          opacity: 1,
                                                      }
                                                    : {
                                                          opacity: 0,
                                                      },
                                            ]}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    })}
                </List>
                <Divider sx={{ my: 1 }} />
                <List>
                    <ListItem disablePadding sx={{ display: 'block', px: 1 }}>
                        <Link
                            onClick={closeDrawer}
                            to="/settings"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <ListItemButton
                                sx={[
                                    {
                                        minHeight: 48,
                                        borderRadius: 2,
                                        transition: 'all 0.2s',
                                    },
                                    open
                                        ? {
                                              justifyContent: 'initial',
                                              px: 2.5,
                                          }
                                        : {
                                              justifyContent: 'center',
                                              px: 2,
                                          },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        },
                                        open
                                            ? {
                                                  mr: 2.5,
                                              }
                                            : {
                                                  mr: 'auto',
                                              },
                                    ]}
                                >
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={t('nav.settings')}
                                    primaryTypographyProps={{
                                        fontWeight: 500,
                                        fontSize: '0.95rem',
                                    }}
                                    sx={[
                                        open
                                            ? {
                                                  opacity: 1,
                                              }
                                            : {
                                                  opacity: 0,
                                              },
                                    ]}
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    width: '100%',
                    minHeight: '100vh',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}
