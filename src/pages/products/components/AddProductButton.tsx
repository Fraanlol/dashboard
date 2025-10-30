import { Box, Fab, useMediaQuery, useTheme } from '@mui/material'
import { AddCircle, AddCircleOutline, Add } from '@mui/icons-material'
import { useNotificationStore } from '@stores/notificationStore'

export default function AddProductButton() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const add = useNotificationStore((state) => state.show)

    if (isMobile) {
        return (
            <Fab
                onClick={() => add('Añadido correctamente', 'success')}
                color="primary"
                aria-label="add product"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
            >
                <Add />
            </Fab>
        )
    }

    return (
        <Box onClick={() => add('Añadido correctamente', 'success')}>
            {theme.palette.mode === 'dark' ? (
                <AddCircleOutline
                    color="primary"
                    sx={{ fontSize: 40, cursor: 'pointer' }}
                />
            ) : (
                <AddCircle
                    color="primary"
                    sx={{ fontSize: 40, cursor: 'pointer' }}
                />
            )}
        </Box>
    )
}
