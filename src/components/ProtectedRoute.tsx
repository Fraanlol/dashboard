import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@stores/authStore'
import { Box, CircularProgress } from '@mui/material'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = useAuthStore((state) => state.user)
    const initialized = useAuthStore((state) => state.initialized)
    const initialize = useAuthStore((state) => state.initialize)

    useEffect(() => {
        if (!initialized) {
            initialize()
        }
    }, [initialized, initialize])

    // Show loading while checking auth
    if (!initialized) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}
