import { useEffect, useState } from 'react'
import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Button,
    TextField,
    Stack,
    IconButton,
    Divider,
    LinearProgress,
    Alert,
    AlertTitle,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useAuthStore } from '@stores/authStore'
import { useProfileStore } from '@stores/profileStore'
import { useNotificationStore } from '@stores/notificationStore'
import { isDemoUser, DEMO_CONFIG } from '@lib/demo'
import { useTranslation } from 'react-i18next'

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user)
    const { t } = useTranslation()
    const {
        profile,
        loading,
        fetchProfile,
        updateUserProfile,
        uploadUserAvatar,
        getDisplayProfile,
    } = useProfileStore()

    const [isEditing, setIsEditing] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        bio: '',
        phone: '',
        location: '',
    })

    // ✅ Solo para verificar si es demo
    const isDemo = isDemoUser(profile?.email)

    useEffect(() => {
        if (user?.id) {
            fetchProfile(user.id)
        }
    }, [user?.id, fetchProfile])

    // ✅ Depender de profile, pero obtener displayProfile dentro
    useEffect(() => {
        if (profile) {
            const display = getDisplayProfile() // Llamar dentro del useEffect
            setFormData({
                full_name: display?.full_name || '',
                email: display?.email || '',
                bio: display?.bio || '',
                phone: display?.phone || '',
                location: display?.location || '',
            })
        }
    }, [profile, getDisplayProfile]) // ← Depende de profile, no de displayProfile

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            useNotificationStore
                .getState()
                .show(t('profile.errors.selectImage'), 'error')
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            useNotificationStore
                .getState()
                .show(t('profile.errors.imageTooLarge'), 'error')
            return
        }

        setAvatarFile(file)
        setAvatarPreview(URL.createObjectURL(file))
    }

    const handleSave = async () => {
        if (!user?.id) return

        if (avatarFile) {
            await uploadUserAvatar(user.id, avatarFile)
            setAvatarFile(null)
            setAvatarPreview(null)
        }

        await updateUserProfile(user.id, {
            full_name: formData.full_name,
            bio: formData.bio,
            phone: formData.phone,
            location: formData.location,
        })

        setIsEditing(false)
    }

    const handleCancel = () => {
        const display = getDisplayProfile() // ✅ Obtener aquí cuando se necesita
        if (display) {
            setFormData({
                full_name: display.full_name || '',
                email: display.email || '',
                bio: display.bio || '',
                phone: display.phone || '',
                location: display.location || '',
            })
        }
        setAvatarPreview(null)
        setAvatarFile(null)
        setIsEditing(false)
    }

    if (!profile) {
        // ✅ Usar profile aquí
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <LinearProgress />
            </Container>
        )
    }

    // ✅ Obtener displayProfile solo en el render, no como variable del componente
    const displayProfile = getDisplayProfile()

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Banner demo */}
            {DEMO_CONFIG.enabled && isDemo && (
                <Alert severity="info" sx={{ mb: 3 }}>
                    <AlertTitle>{t('profile.demo.title')}</AlertTitle>
                    {t('profile.demo.body')}
                </Alert>
            )}

            <Paper elevation={3} sx={{ p: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography variant="h4" component="h1">
                        {t('profile.title')}
                    </Typography>
                    {!isEditing ? (
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => setIsEditing(true)}
                        >
                            {t('profile.editProfile')}
                        </Button>
                    ) : (
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                startIcon={<CancelIcon />}
                                onClick={handleCancel}
                            >
                                {t('profile.cancel')}
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {t('profile.save')}
                            </Button>
                        </Stack>
                    )}
                </Box>

                {loading && <LinearProgress sx={{ mb: 2 }} />}

                {!isEditing ? (
                    // VIEW MODE - Aquí SÍ necesitas displayProfile
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 3,
                            }}
                        >
                            <Avatar
                                src={
                                    avatarPreview ||
                                    displayProfile?.avatar_url ||
                                    undefined
                                }
                                sx={{
                                    width: 120,
                                    height: 120,
                                    fontSize: '3rem',
                                    bgcolor: 'primary.main',
                                }}
                            >
                                {displayProfile?.full_name?.charAt(0) ||
                                    displayProfile?.email?.charAt(0) ||
                                    '?'}
                            </Avatar>
                        </Box>

                        <Stack spacing={2}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <PersonIcon color="action" />
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('profile.labels.fullName')}
                                    </Typography>
                                    <Typography variant="body1">
                                        {displayProfile?.full_name ||
                                            t('profile.notSet')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider />

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <EmailIcon color="action" />
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('profile.labels.email')}
                                    </Typography>
                                    <Typography variant="body1">
                                        {displayProfile?.email}
                                    </Typography>
                                </Box>
                            </Box>

                            {displayProfile?.bio && (
                                <>
                                    <Divider />
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {t('profile.labels.bio')}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ mt: 0.5 }}
                                        >
                                            {displayProfile.bio}
                                        </Typography>
                                    </Box>
                                </>
                            )}

                            {displayProfile?.phone && (
                                <>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <PhoneIcon color="action" />
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {t('profile.labels.phone')}
                                            </Typography>
                                            <Typography variant="body1">
                                                {displayProfile.phone}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </>
                            )}

                            {displayProfile?.location && (
                                <>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <LocationOnIcon color="action" />
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {t('profile.labels.location')}
                                            </Typography>
                                            <Typography variant="body1">
                                                {displayProfile.location}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Stack>

                        <Box
                            sx={{
                                mt: 3,
                                pt: 2,
                                borderTop: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {t('profile.memberSince')}:{' '}
                                {new Date(
                                    displayProfile?.created_at || ''
                                ).toLocaleDateString()}
                            </Typography>
                            {displayProfile?.updated_at && (
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                >
                                    {t('profile.lastUpdated')}:{' '}
                                    {new Date(
                                        displayProfile.updated_at
                                    ).toLocaleDateString()}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ) : (
                    // EDIT MODE - Aquí también necesitas displayProfile para el avatar
                    <Box component="form" noValidate>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 3,
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <Avatar
                                    src={
                                        avatarPreview ||
                                        displayProfile?.avatar_url ||
                                        undefined
                                    }
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        fontSize: '3rem',
                                        bgcolor: 'primary.main',
                                    }}
                                >
                                    {formData.full_name?.charAt(0) ||
                                        formData.email?.charAt(0) ||
                                        '?'}
                                </Avatar>
                                <IconButton
                                    component="label"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        bgcolor: 'background.paper',
                                        '&:hover': {
                                            bgcolor: 'background.paper',
                                        },
                                    }}
                                >
                                    <CameraAltIcon />
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                </IconButton>
                            </Box>
                        </Box>

                        <Stack spacing={3}>
                            <TextField
                                label={t('profile.labels.fullName')}
                                value={formData.full_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        full_name: e.target.value,
                                    })
                                }
                                fullWidth
                            />

                            <TextField
                                label={t('profile.labels.email')}
                                value={formData.email}
                                disabled
                                fullWidth
                                helperText={t('profile.emailCannotChange')}
                            />

                            <TextField
                                label={t('profile.labels.bio')}
                                value={formData.bio}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        bio: e.target.value,
                                    })
                                }
                                multiline
                                rows={3}
                                fullWidth
                            />

                            <TextField
                                label={t('profile.labels.phone')}
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                fullWidth
                            />

                            <TextField
                                label={t('profile.labels.location')}
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        location: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </Stack>
                    </Box>
                )}
            </Paper>
        </Container>
    )
}
