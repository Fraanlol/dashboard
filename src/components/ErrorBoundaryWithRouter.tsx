import { useNavigate, useLocation } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

/**
 * ErrorBoundaryWithRouter
 *
 * Wrapper that provides React Router's navigate function to ErrorBoundary.
 * Use this instead of ErrorBoundary directly when inside a Router context.
 *
 * The key prop based on location.pathname forces the ErrorBoundary to remount
 * when the route changes, automatically resetting any error state.
 */
export default function ErrorBoundaryWithRouter({ children, fallback }: Props) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <ErrorBoundary
            key={location.pathname}
            navigate={navigate}
            fallback={fallback}
        >
            {children}
        </ErrorBoundary>
    )
}
