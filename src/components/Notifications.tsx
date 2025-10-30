import { Snackbar, Alert } from '@mui/material'
import { useNotificationStore } from '@stores/notificationStore'

export default function Notifications() {
    const notifications = useNotificationStore((state) => state.notifications)
    const remove = useNotificationStore((state) => state.remove)

    let currentNotification = notifications[0] || null

    {
        if (!currentNotification) {
            return null
        }
    }
    return (
        <>
            <Snackbar
                open={!!currentNotification}
                autoHideDuration={4000}
                key={currentNotification?.id}
                onClose={() => remove(currentNotification!.id)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ bottom: { xs: 90, lg: 80 } }}
                slotProps={{
                    clickAwayListener: {
                        onClickAway: (event) => {
                            ;(event as any).defaultMuiPrevented = true
                        },
                    },
                }}
            >
                <Alert
                    onClose={() => remove(currentNotification!.id)}
                    severity={currentNotification?.type || 'info'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {currentNotification?.message}
                </Alert>
            </Snackbar>
        </>
    )
}
