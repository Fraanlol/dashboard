/**
 * Exporta un array de objetos a un archivo CSV
 * @param data - Array de objetos a exportar
 * @param filename - Nombre del archivo (sin extensión)
 * @param columns - Columnas específicas a exportar (opcional, por defecto todas)
 */
export function exportToCSV<T extends Record<string, unknown>>(
    data: T[],
    filename: string,
    columns?: (keyof T)[]
) {
    if (data.length === 0) {
        console.warn('No data to export')
        return
    }

    // Determinar qué columnas exportar
    const columnsToExport = columns || (Object.keys(data[0]) as (keyof T)[])

    // Crear header row
    const headers = columnsToExport.map((col) => String(col))
    const csvHeaders = headers.join(',')

    // Crear data rows
    const csvRows = data.map((row) => {
        return columnsToExport
            .map((col) => {
                const value = row[col]
                // Escapar valores que contengan comas, comillas o saltos de línea
                if (value === null || value === undefined) return ''
                const stringValue = String(value)
                if (
                    stringValue.includes(',') ||
                    stringValue.includes('"') ||
                    stringValue.includes('\n')
                ) {
                    return `"${stringValue.replace(/"/g, '""')}"`
                }
                return stringValue
            })
            .join(',')
    })

    // Combinar headers y rows
    const csvContent = [csvHeaders, ...csvRows].join('\n')

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

/**
 * Formatea datos de productos para exportación
 */
export function formatProductsForExport(
    products: Array<{
        id: number
        title: string
        brand?: string
        category: string
        price: number
        stock: number
        rating?: number
        discountPercentage?: number
    }>
) {
    return products.map((product) => ({
        ID: product.id,
        Title: product.title,
        Brand: product.brand || 'N/A',
        Category: product.category,
        Price: product.price,
        Stock: product.stock,
        Rating: product.rating || 'N/A',
        'Discount %': product.discountPercentage || 0,
    }))
}

/**
 * Formatea datos de usuarios para exportación
 */
export function formatUsersForExport(
    users: Array<{
        id: number
        firstName: string
        lastName?: string
        email: string
        role: string
        age?: number
        gender?: string
    }>
) {
    return users.map((user) => ({
        ID: user.id,
        'First Name': user.firstName,
        'Last Name': user.lastName || '',
        Email: user.email,
        Role: user.role,
        Age: user.age || 'N/A',
        Gender: user.gender || 'N/A',
    }))
}
