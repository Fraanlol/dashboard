import { useEffect, useMemo } from 'react'
import {
    Dialog,
    TextField,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Chip,
    Box,
    Typography,
    InputAdornment,
    IconButton,
    Divider,
    CircularProgress,
    useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import PersonIcon from '@mui/icons-material/Person'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useGlobalSearchStore } from '@stores/globalSearchStore'
import { useProdStore } from '@stores/prodStore'
import { useUsersStore } from '@stores/usersStore'
import { useTranslation } from 'react-i18next'

interface Product {
    id: number
    title: string
    price: number
    category: string
    thumbnail: string
}

interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    image: string
    role: string
}

interface SearchResults {
    products: Product[]
    users: User[]
}

export default function GlobalSearch() {
    const theme = useTheme()
    const navigate = useNavigate()
    const isOpen = useGlobalSearchStore((state) => state.isOpen)
    const searchQuery = useGlobalSearchStore((state) => state.searchQuery)
    const setSearchQuery = useGlobalSearchStore((state) => state.setSearchQuery)
    const closeSearch = useGlobalSearchStore((state) => state.closeSearch)
    const openSearch = useGlobalSearchStore((state) => state.openSearch)
    const { t } = useTranslation()

    // Store setters para filtrar en las páginas
    const setProductSearchQuery = useProdStore((state) => state.setSearchQuery)
    const setUserSearchQuery = useUsersStore((state) => state.setSearchQuery)

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+K o Cmd+K para abrir
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                openSearch()
            }
            // Escape para cerrar
            if (e.key === 'Escape' && isOpen) {
                closeSearch()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, openSearch, closeSearch])

    // Search query - buscar en múltiples endpoints
    const { data: results, isLoading } = useQuery<SearchResults>({
        queryKey: ['global-search', searchQuery],
        queryFn: async () => {
            if (searchQuery.length < 2) {
                return { products: [], users: [] }
            }

            const [productsRes, usersRes] = await Promise.all([
                fetch(
                    `https://dummyjson.com/products/search?q=${searchQuery}&limit=5`
                ).then((r) => r.json()),
                fetch(
                    `https://dummyjson.com/users/search?q=${searchQuery}&limit=5`
                ).then((r) => r.json()),
            ])

            return {
                products: productsRes.products || [],
                users: usersRes.users || [],
            }
        },
        enabled: isOpen && searchQuery.length >= 2,
        staleTime: 1000 * 30, // Cache 30 segundos
    })

    const totalResults = useMemo(() => {
        if (!results) return 0
        return results.products.length + results.users.length
    }, [results])

    const handleProductClick = (productId: number) => {
        // Establecer el query de búsqueda en el store de productos
        setProductSearchQuery(searchQuery)
        closeSearch()
        navigate('/products')
    }

    const handleUserClick = (userId: number) => {
        // Establecer el query de búsqueda en el store de usuarios
        setUserSearchQuery(searchQuery)
        closeSearch()
        navigate('/users')
    }

    return (
        <Dialog
            open={isOpen}
            onClose={closeSearch}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        position: 'fixed',
                        top: '10%',
                        borderRadius: 3,
                        maxHeight: '70vh',
                        backgroundColor:
                            theme.palette.mode === 'dark'
                                ? 'rgba(30, 30, 30, 0.98)'
                                : 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                    },
                },
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    },
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                {/* Search Input */}
                <TextField
                    fullWidth
                    autoFocus
                    placeholder={t('globalSearch.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isLoading && (
                                        <CircularProgress
                                            size={20}
                                            sx={{ mr: 1 }}
                                        />
                                    )}
                                    {searchQuery && (
                                        <IconButton
                                            size="small"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor:
                                theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(0, 0, 0, 0.02)',
                        },
                    }}
                />

                {/* Results Counter */}
                {searchQuery.length >= 2 && results && totalResults > 0 && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 2, px: 2 }}
                    >
                        Found {totalResults} result
                        {totalResults !== 1 ? 's' : ''}
                    </Typography>
                )}

                {/* Results Container */}
                <Box sx={{ mt: 2, maxHeight: '50vh', overflowY: 'auto' }}>
                    {/* Loading State */}
                    {isLoading && searchQuery.length >= 2 && (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <CircularProgress size={32} />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2 }}
                            >
                                Searching...
                            </Typography>
                        </Box>
                    )}

                    {/* Results */}
                    {!isLoading && results && (
                        <>
                            {/* Products Section */}
                            {results.products.length > 0 && (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            px: 2,
                                            py: 1,
                                        }}
                                    >
                                        <ProductionQuantityLimitsIcon
                                            fontSize="small"
                                            color="action"
                                        />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            PRODUCTS
                                        </Typography>
                                    </Box>
                                    <List sx={{ py: 0 }}>
                                        {results.products.map((product) => (
                                            <ListItem
                                                key={`product-${product.id}`}
                                                disablePadding
                                            >
                                                <ListItemButton
                                                    onClick={() =>
                                                        handleProductClick(
                                                            product.id
                                                        )
                                                    }
                                                    sx={{
                                                        borderRadius: 2,
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={
                                                                product.thumbnail
                                                            }
                                                            variant="rounded"
                                                            sx={{
                                                                width: 48,
                                                                height: 48,
                                                            }}
                                                        >
                                                            <ProductionQuantityLimitsIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={product.title}
                                                        secondary={`$${product.price}`}
                                                        slotProps={{
                                                            primary: {
                                                                noWrap: true,
                                                                fontWeight: 500,
                                                            },
                                                        }}
                                                    />
                                                    <Chip
                                                        label={product.category}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ ml: 1 }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}

                            {/* Divider between sections */}
                            {results.products.length > 0 &&
                                results.users.length > 0 && (
                                    <Divider sx={{ my: 1 }} />
                                )}

                            {/* Users Section */}
                            {results.users.length > 0 && (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            px: 2,
                                            py: 1,
                                        }}
                                    >
                                        <PersonIcon
                                            fontSize="small"
                                            color="action"
                                        />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            USERS
                                        </Typography>
                                    </Box>
                                    <List sx={{ py: 0 }}>
                                        {results.users.map((user) => (
                                            <ListItem
                                                key={`user-${user.id}`}
                                                disablePadding
                                            >
                                                <ListItemButton
                                                    onClick={() =>
                                                        handleUserClick(user.id)
                                                    }
                                                    sx={{
                                                        borderRadius: 2,
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={user.image}
                                                            sx={{
                                                                width: 48,
                                                                height: 48,
                                                            }}
                                                        >
                                                            {user.firstName[0]}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={`${user.firstName} ${user.lastName}`}
                                                        secondary={user.email}
                                                        slotProps={{
                                                            primary: {
                                                                noWrap: true,
                                                                fontWeight: 500,
                                                            },
                                                            secondary: {
                                                                noWrap: true,
                                                            },
                                                        }}
                                                    />
                                                    <Chip
                                                        label={user.role}
                                                        size="small"
                                                        color={
                                                            user.role ===
                                                            'admin'
                                                                ? 'error'
                                                                : user.role ===
                                                                    'moderator'
                                                                  ? 'warning'
                                                                  : 'primary'
                                                        }
                                                        sx={{ ml: 1 }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}

                            {/* Empty State */}
                            {searchQuery.length >= 2 &&
                                !isLoading &&
                                totalResults === 0 && (
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <SearchIcon
                                            sx={{
                                                fontSize: 48,
                                                color: 'text.disabled',
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 2 }}
                                        >
                                            No results found for "{searchQuery}"
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.disabled"
                                        >
                                            Try different keywords
                                        </Typography>
                                    </Box>
                                )}
                        </>
                    )}

                    {/* Initial State */}
                    {searchQuery.length < 2 && (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <SearchIcon
                                sx={{ fontSize: 48, color: 'text.disabled' }}
                            />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2 }}
                            >
                                {t('globalSearch.minChars')}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                                {t('globalSearch.caption')}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Footer with shortcuts hint */}
                <Box
                    sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        <Chip
                            label={t('globalSearch.key.esc')}
                            size="small"
                            sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                            }}
                        />
                        <Typography variant="caption" color="text.secondary">
                            {t('globalSearch.toClose')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        <Chip
                            label={t('globalSearch.key.enter')}
                            size="small"
                            sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                            }}
                        />
                        <Typography variant="caption" color="text.secondary">
                            {t('globalSearch.toSelect')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}
