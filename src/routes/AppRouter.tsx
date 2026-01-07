import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    ScrollRestoration,
} from 'react-router-dom'
import MiniDrawer from '@components/Drawer'
import ProtectedRoute from '@components/ProtectedRoute'
import Notifications from '@components/Notifications'

import Dashboard from '@pages/dashboard/Dashboard'
import NotFoundPage from '@pages/notFound/NotFoundPage'
import ServerErrorPage from '@pages/error/ServerErrorPage'
import Users from '@pages/users/Users'
import Products from '@pages/products/Products'
import LoginPage from '@pages/auth/LoginPage'
import RegisterPage from '@pages/auth/RegisterPage'
import ProfilePage from '@pages/profile/ProfilePage'

function RootLayout() {
    return (
        <>
            <Outlet />
            <ScrollRestoration />
            <Notifications />
        </>
    )
}

function ProtectedLayout() {
    return (
        <ProtectedRoute>
            <MiniDrawer>
                <Outlet />
            </MiniDrawer>
        </ProtectedRoute>
    )
}

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        errorElement: <ServerErrorPage />,
        children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/register', element: <RegisterPage /> },

            { path: '/404', element: <NotFoundPage /> },
            { path: '/500', element: <ServerErrorPage /> },

            {
                element: <ProtectedLayout />,
                children: [
                    { path: '/', element: <Dashboard /> },
                    { path: '/users', element: <Users /> },
                    { path: '/products', element: <Products /> },
                    { path: '/profile', element: <ProfilePage /> },
                ],
            },

            { path: '*', element: <NotFoundPage /> },
        ],
    },
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
