import { create } from 'zustand'

export interface Product {
    id: number
    title: string
    category: string
    price: number
    rating: number
    thumbnail: string
    stock: number
    status: 'active' | 'inactive'
}

const useProdStore = create<Product[]>( set => ({
    
})
)>