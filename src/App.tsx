import { AppRouter } from './routes/AppRouter'
import ErrorBoundary from '@components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const queryClient = new QueryClient()

export const App = () => {
    const { t } = useTranslation()

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <AppRouter />
            </QueryClientProvider>
        </ErrorBoundary>
    )
}

export default App
