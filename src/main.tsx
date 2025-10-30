import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/700.css'
import { CustomThemeProvider } from './theme/ThemeProvider'
import { StyledEngineProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
import './styles/App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledEngineProvider enableCssLayer>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <CustomThemeProvider>
                <App />
            </CustomThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
)
