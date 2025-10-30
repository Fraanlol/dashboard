import { Product } from '@stores/prodStore'

export interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

export const getProducts = async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params).toString()
    const res = await fetch(`https://dummyjson.com/products?${query}`)
    return res.json()
}

export const getProductById = async (id: number) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    return res.json()
}
