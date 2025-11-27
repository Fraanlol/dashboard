import { Paper, Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface DashboardCardProps {
    children: ReactNode
    title?: string
    height?: string | number
}

/**
 * DashboardCard - Wrapper component for dashboard widgets
 * Provides consistent styling and spacing for all dashboard cards
 */
export default function DashboardCard({
    children,
    title,
    height = 'auto',
}: DashboardCardProps) {
    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                height: height,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {title && (
                <Box className="text-gray-600 mb-3">
                    <Typography
                        className="fade-in font-bold text-lg"
                        sx={{ fontWeight: 600, color: 'text.primary' }}
                    >
                        {title}
                    </Typography>
                </Box>
            )}
            <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
        </Paper>
    )
}
