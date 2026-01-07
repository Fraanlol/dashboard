import { Link, useLocation } from 'react-router-dom'
import { Breadcrumbs as MuiBreadcrumbs, Typography, Box } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import HomeIcon from '@mui/icons-material/Home'
import { useTranslation } from 'react-i18next'

const routeNameMap: Record<string, string> = {
    '/': 'nav.dashboard',
    '/dashboard': 'nav.dashboard',
    '/products': 'nav.products',
    '/users': 'nav.users',
    '/settings': 'nav.settings',
    '/profile': 'userMenu.profile',
}

export default function Breadcrumbs() {
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)
    const { t } = useTranslation()

    return (
        <MuiBreadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
                display: { xs: 'none', sm: 'flex' },
                '& .MuiBreadcrumbs-separator': {
                    color: 'text.secondary',
                },
            }}
        >
            <Link
                to="/dashboard"
                style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover .home-icon': { color: 'primary.main' },
                        '&:hover .home-text': { color: 'primary.main' },
                    }}
                >
                    <HomeIcon
                        className="home-icon"
                        sx={{
                            fontSize: 18,
                            color:
                                pathnames.length === 0 ||
                                pathnames[0] === 'dashboard'
                                    ? 'primary.main'
                                    : 'text.secondary',
                            transition: 'color 0.2s',
                        }}
                    />
                    <Typography
                        className="home-text"
                        sx={{
                            fontSize: '0.875rem',
                            color:
                                pathnames.length === 0 ||
                                pathnames[0] === 'dashboard'
                                    ? 'primary.main'
                                    : 'text.secondary',
                            fontWeight:
                                pathnames.length === 0 ||
                                pathnames[0] === 'dashboard'
                                    ? 600
                                    : 400,
                            transition: 'color 0.2s',
                        }}
                    >
                        {t('nav.dashboard')}
                    </Typography>
                </Box>
            </Link>

            {/* Breadcrumbs dinámicos */}
            {pathnames
                .filter((p) => p !== 'dashboard')
                .map((value, index) => {
                    const actualIndex = pathnames.indexOf(value)
                    const last = actualIndex === pathnames.length - 1
                    const to = `/${pathnames.slice(0, actualIndex + 1).join('/')}`
                    const routeName =
                        routeNameMap[to] ||
                        value.charAt(0).toUpperCase() + value.slice(1)

                    const displayName = routeNameMap[to]
                        ? t(routeNameMap[to])
                        : routeName

                    return last ? (
                        <Typography
                            key={to}
                            sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                            }}
                        >
                            {displayName}
                        </Typography>
                    ) : (
                        <Link
                            key={to}
                            to={to}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: 'primary.main',
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {displayName}
                            </Typography>
                        </Link>
                    )
                })}
        </MuiBreadcrumbs>
    )
}
