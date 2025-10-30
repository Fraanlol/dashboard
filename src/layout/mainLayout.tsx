import React from 'react'
import { Box } from '@mui/material'
import Footer from '@components/Footer'

interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flex: 1,
                    p: 3,
                    maxWidth: '100%',
                    mx: 'auto',
                    width: '100%',
                }}
            >
                {children}
            </Box>
            <Footer />
        </>
    )
}

export default MainLayout
