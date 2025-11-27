import {
    Box,
    Paper,
    Typography,
    Divider,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Drawer,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ClearIcon from '@mui/icons-material/Clear'
import FilterListIcon from '@mui/icons-material/FilterList'
import CloseIcon from '@mui/icons-material/Close'
import { useProdStore } from '@stores/prodStore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ProductsFilterSidebarProps {
    categories: string[] | undefined
    isLoading: boolean
    exportDisabled?: boolean
}

export default function ProductsFilterSidebar({
    categories,
    isLoading,
    exportDisabled = false,
}: ProductsFilterSidebarProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [mobileOpen, setMobileOpen] = useState(false)

    const currentCategory = useProdStore((state) => state.currentCategory)
    const setCurrentCategory = useProdStore((state) => state.setCurrentCategory)
    const filters = useProdStore((state) => state.filters)
    const setStockStatus = useProdStore((state) => state.setStockStatus)
    const setPriceRange = useProdStore((state) => state.setPriceRange)
    const sortField = useProdStore((state) => state.sortField)
    const resetAllFilters = useProdStore((state) => state.resetFilters)

    const hasActiveFilters =
        currentCategory !== 'all' ||
        filters.stockStatus !== 'all' ||
        filters.priceRange !== 'all' ||
        sortField !== null

    const { t } = useTranslation()

    const STOCK_FILTERS = [
        { label: t('products.filters.stock.all'), value: 'all' },
        { label: t('products.filters.stock.inStock'), value: 'in-stock' },
        { label: t('products.filters.stock.lowStock'), value: 'low-stock' },
        {
            label: t('products.filters.stock.outOfStock'),
            value: 'out-of-stock',
        },
    ]

    const PRICE_FILTERS = [
        { label: t('products.filters.price.all'), value: 'all' },
        { label: t('products.filters.price.under50'), value: 'under-50' },
        { label: t('products.filters.price.50to100'), value: '50-100' },
        { label: t('products.filters.price.100to500'), value: '100-500' },
        { label: t('products.filters.price.over500'), value: 'over-500' },
    ]

    const handleReset = () => {
        resetAllFilters()
        if (isMobile) {
            setMobileOpen(false)
        }
    }

    const activeTokens = [
        currentCategory !== 'all'
            ? t('products.filters.tokenCategory', {
                  category: currentCategory?.replace('-', ' '),
              })
            : null,
        filters.stockStatus !== 'all'
            ? t('products.filters.tokenStock', { stock: filters.stockStatus })
            : null,
        filters.priceRange !== 'all'
            ? t('products.filters.tokenPrice', { price: filters.priceRange })
            : null,
    ].filter(Boolean) as string[]

    const sidebarContent = (
        <Box sx={{ width: '100%', p: 2.5 }}>
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}
                >
                    {t('products.filters.inventoryFilters')}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {t('products.filters.shapeCatalog')}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mt: 0.5 }}
                >
                    {t('products.filters.description')}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 2,
                }}
            >
                {activeTokens.length === 0 && (
                    <Chip
                        label={t('products.filters.allFilters')}
                        size="small"
                        sx={{
                            borderRadius: 2,
                            border: '1px dashed',
                            borderColor: alpha(
                                theme.palette.text.secondary,
                                0.4
                            ),
                            color: 'text.secondary',
                        }}
                    />
                )}
                {activeTokens.map((token) => (
                    <Chip
                        key={token}
                        label={token}
                        size="small"
                        onDelete={handleReset}
                        sx={{
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.12),
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                        }}
                    />
                ))}
            </Box>

            {hasActiveFilters && (
                <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<ClearIcon />}
                    onClick={handleReset}
                    sx={{
                        mb: 2,
                        borderColor: alpha(theme.palette.primary.main, 0.4),
                        color: theme.palette.primary.main,
                    }}
                >
                    {t('products.filters.clearAll')}
                </Button>
            )}

            <Divider sx={{ mb: 2, opacity: 0.4 }} />

            {/* Categories */}
            <Accordion defaultExpanded elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>
                        {t('products.filters.categories')}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                            value={currentCategory}
                            onChange={(e) => setCurrentCategory(e.target.value)}
                        >
                            <FormControlLabel
                                value="all"
                                control={<Radio size="small" />}
                                label={
                                    <Typography variant="body2">
                                        {t('products.filters.allCategories')}
                                    </Typography>
                                }
                            />
                            {!isLoading &&
                                categories?.map((category) => (
                                    <FormControlLabel
                                        key={category}
                                        value={category}
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {category}
                                            </Typography>
                                        }
                                    />
                                ))}
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 1 }} />

            {/* Stock Status */}
            <Accordion defaultExpanded elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>
                        {t('products.filters.stock.title')}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                            value={filters.stockStatus}
                            onChange={(e) => setStockStatus(e.target.value)}
                        >
                            {STOCK_FILTERS.map((filter) => (
                                <FormControlLabel
                                    key={filter.value}
                                    value={filter.value}
                                    control={<Radio size="small" />}
                                    label={
                                        <Typography variant="body2">
                                            {filter.label}
                                        </Typography>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 1 }} />

            {/* Price Range */}
            <Accordion defaultExpanded elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>
                        {t('products.filters.price.title')}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                            value={filters.priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                        >
                            {PRICE_FILTERS.map((filter) => (
                                <FormControlLabel
                                    key={filter.value}
                                    value={filter.value}
                                    control={<Radio size="small" />}
                                    label={
                                        <Typography variant="body2">
                                            {filter.label}
                                        </Typography>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </Box>
    )

    if (isMobile) {
        return (
            <>
                <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={() => setMobileOpen(true)}
                    fullWidth
                    sx={{
                        mb: 2,
                        justifyContent: 'flex-start',
                        py: 1.25,
                        fontWeight: 600,
                        borderRadius: 2.5,
                        boxShadow: 'none',
                        borderColor: theme.palette.divider,
                        color: theme.palette.text.primary,
                    }}
                >
                    {t('products.filters.title')}
                    {hasActiveFilters && (
                        <Chip
                            label={t('products.filters.active')}
                            size="small"
                            color="secondary"
                            sx={{ ml: 1, height: 20 }}
                        />
                    )}
                </Button>
                <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                >
                    {sidebarContent}
                </Drawer>
            </>
        )
    }

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
                height: 'fit-content',
                position: 'sticky',
                top: 80,
                overflow: 'hidden',
                boxShadow: 'none',
            }}
        >
            {sidebarContent}
        </Paper>
    )
}
