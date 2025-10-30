// src/App.tsx
import { AppRouter } from './routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import Notifications from '@components/Notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRouter />
                <Notifications />
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
