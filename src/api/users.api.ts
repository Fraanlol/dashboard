import { User } from '@stores/usersStore'

export interface UsersResponse {
    users: User[]
    total: number
    skip: number
    limit: number
}

export const getUsers = async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params).toString()
    const res = await fetch(`https://dummyjson.com/users?${query}`)
    return res.json()
}

export const getUserById = async (id: number) => {
    const res = await fetch(`https://dummyjson.com/users/${id}`)
    return res.json()
}
