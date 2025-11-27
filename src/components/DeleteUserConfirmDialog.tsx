import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Alert,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { useDeleteUserDialogStore } from '@stores/userModalStore'
import { useTranslation } from 'react-i18next'

export default function DeleteUserConfirmDialog() {
    const { t } = useTranslation()
    const isOpen = useDeleteUserDialogStore((state) => state.isOpen)
    const userToDelete = useDeleteUserDialogStore((state) => state.userToDelete)
    const closeDeleteDialog = useDeleteUserDialogStore(
        (state) => state.closeDeleteDialog
    )
    const onDelete = useDeleteUserDialogStore((state) => state.onDelete)

    const handleDelete = () => {
        if (!userToDelete) return

        if (onDelete) {
            onDelete(userToDelete.id)
        }

        closeDeleteDialog()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={closeDeleteDialog}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: 1,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningAmberIcon color="error" />
                    <Typography variant="h6" component="span">
                        {t('dialog.deleteUser.title')}
                    </Typography>
                </Box>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={closeDeleteDialog}
                    aria-label={t('dialog.actions.close')}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    {t('dialog.deleteUser.warning')}
                </Alert>

                <Typography variant="body1" gutterBottom>
                    {t('dialog.deleteUser.confirmText')}
                </Typography>

                {userToDelete && (
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: 'background.default',
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            {t('dialog.deleteUser.userName')}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                            {userToDelete.name}
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    onClick={closeDeleteDialog}
                    variant="outlined"
                    color="inherit"
                >
                    {t('dialog.actions.cancel')}
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="contained"
                    color="error"
                >
                    {t('dialog.deleteUser.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
