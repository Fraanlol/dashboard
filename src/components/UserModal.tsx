import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useUserModalStore, UserFormData } from '@stores/userModalStore'
import { useTranslation } from 'react-i18next'

export default function UserModal() {
    const { t } = useTranslation()
    const isOpen = useUserModalStore((state) => state.isOpen)
    const mode = useUserModalStore((state) => state.mode)
    const selectedUser = useUserModalStore((state) => state.selectedUser)
    const closeModal = useUserModalStore((state) => state.closeModal)
    const onSubmit = useUserModalStore((state) => state.onSubmit)

    const [formData, setFormData] = useState<UserFormData>({
        firstName: '',
        lastName: '',
        email: '',
        age: 18,
        gender: 'male',
        role: 'user',
    })

    const [errors, setErrors] = useState<
        Partial<Record<keyof UserFormData, string>>
    >({})

    // Initialize form with selected user data when editing
    useEffect(() => {
        if (mode === 'edit' && selectedUser) {
            setFormData(selectedUser)
        } else if (mode === 'create') {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                age: 18,
                gender: 'male',
                role: 'user',
            })
        }
        setErrors({})
    }, [mode, selectedUser, isOpen])

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof UserFormData, string>> = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = t('userModal.validation.firstName')
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = t('userModal.validation.lastName')
        }
        if (!formData.email.trim()) {
            newErrors.email = t('userModal.validation.emailRequired')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('userModal.validation.emailInvalid')
        }
        if (formData.age < 1 || formData.age > 120) {
            newErrors.age = t('userModal.validation.ageRange')
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        if (onSubmit && mode) {
            onSubmit(formData, mode)
        }

        closeModal()
    }

    const handleChange = (
        field: keyof UserFormData,
        value: UserFormData[keyof UserFormData]
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            maxWidth="sm"
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
                    pb: 2,
                }}
            >
                {mode === 'create'
                    ? t('userModal.title.create')
                    : t('userModal.title.edit')}
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={closeModal}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label={t('userModal.label.firstName')}
                        value={formData.firstName}
                        onChange={(e) =>
                            handleChange('firstName', e.target.value)
                        }
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                        required
                    />

                    <TextField
                        label={t('userModal.label.lastName')}
                        value={formData.lastName}
                        onChange={(e) =>
                            handleChange('lastName', e.target.value)
                        }
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                        required
                    />

                    <TextField
                        label={t('userModal.label.email')}
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        required
                    />

                    <TextField
                        label={t('userModal.label.age')}
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                            handleChange('age', Number(e.target.value))
                        }
                        error={!!errors.age}
                        helperText={errors.age}
                        fullWidth
                        required
                        slotProps={{
                            htmlInput: {
                                min: 1,
                                max: 120,
                            },
                        }}
                    />

                    <TextField
                        label={t('userModal.label.gender')}
                        select
                        value={formData.gender}
                        onChange={(e) =>
                            handleChange(
                                'gender',
                                e.target.value as 'male' | 'female'
                            )
                        }
                        fullWidth
                    >
                        <MenuItem value="male">
                            {t('userModal.options.gender.male')}
                        </MenuItem>
                        <MenuItem value="female">
                            {t('userModal.options.gender.female')}
                        </MenuItem>
                    </TextField>

                    <TextField
                        label={t('userModal.label.role')}
                        select
                        value={formData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="user">
                            {t('userModal.options.role.user')}
                        </MenuItem>
                        <MenuItem value="admin">
                            {t('userModal.options.role.admin')}
                        </MenuItem>
                        <MenuItem value="moderator">
                            {t('userModal.options.role.moderator')}
                        </MenuItem>
                    </TextField>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={closeModal} variant="outlined" color="inherit">
                    {t('userModal.buttons.cancel')}
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    {mode === 'create'
                        ? t('userModal.buttons.create')
                        : t('userModal.buttons.update')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
