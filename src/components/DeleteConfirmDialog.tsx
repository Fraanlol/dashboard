import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Alert,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { useDeleteDialogStore } from '@stores/productModalStore'

export default function DeleteConfirmDialog() {
    const { t } = useTranslation()
    const isOpen = useDeleteDialogStore((state) => state.isOpen)
    const productToDelete = useDeleteDialogStore(
        (state) => state.productToDelete
    )
    const closeDeleteDialog = useDeleteDialogStore(
        (state) => state.closeDeleteDialog
    )
    const onDelete = useDeleteDialogStore((state) => state.onDelete)

    const handleConfirm = () => {
        if (productToDelete?.id && onDelete) {
            onDelete(productToDelete.id)
        }
        closeDeleteDialog()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={closeDeleteDialog}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                    },
                },
            }}
        >
            <DialogTitle>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <WarningAmberIcon color="error" />
                    <Typography variant="h6" fontWeight={600}>
                        {t('dialog.deleteProduct.title')}
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    {t('dialog.deleteProduct.warning')}
                </Alert>
                <Typography variant="body2" color="text.secondary">
                    {t('dialog.deleteProduct.pre')}{' '}
                    <strong>"{productToDelete?.title}"</strong>
                    {t('dialog.deleteProduct.post')}
                </Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={closeDeleteDialog} color="inherit">
                    {t('dialog.actions.cancel')}
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="error"
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    {t('dialog.deleteProduct.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
