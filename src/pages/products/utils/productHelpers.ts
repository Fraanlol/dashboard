export const getStockChipProps = (stock: number) => {
    if (stock === 0) {
        return { color: 'error' as const, label: 'Out of Stock' }
    } else if (stock <= 10) {
        return { color: 'warning' as const, label: 'Low Stock' }
    } else {
        return { color: 'success' as const, label: 'In Stock' }
    }
}

export const formatPrice = (price: number) => `$${price.toFixed(2)}`

export type SortOption = {
    field: 'title' | 'category' | 'price' | 'stock'
    label: string
}

export const SORT_OPTIONS: SortOption[] = [
    { field: 'title', label: 'Name' },
    { field: 'category', label: 'Category' },
    { field: 'price', label: 'Price' },
    { field: 'stock', label: 'Stock' },
]

export const getSortLabel = (
    sortField: string | null,
    sortOrder: 'asc' | 'desc'
): string => {
    if (!sortField) return 'Sort by'
    const option = SORT_OPTIONS.find((opt) => opt.field === sortField)
    const orderIcon = sortOrder === 'asc' ? '↑' : '↓'
    return `${option?.label} ${orderIcon}`
}
