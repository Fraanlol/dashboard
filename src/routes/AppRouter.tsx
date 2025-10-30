// src/router/AppRouter.tsx
import { Routes, Route } from 'react-router-dom'
import MiniDrawer from '@components/Drawer'

import Dashboard from '@pages/dashboard/Dashboard'
import NotFoundPage from '@pages/notFound/NotFoundPage'
import Users from '@pages/users/Users'
import Products from '@pages/products/Products'

export const AppRouter = () => {
    return (
        <MiniDrawer>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </MiniDrawer>
    )
}
