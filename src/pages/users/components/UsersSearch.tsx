import {
    InputAdornment,
    TextField,
    IconButton,
    Paper,
    Divider,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import { useUsersStore } from '@stores/usersStore'
import { useTranslation } from 'react-i18next'

const UsersSearch = () => {
    const searchQuery = useUsersStore((state) => state.searchQuery)
    const setSearchQuery = useUsersStore((state) => state.setSearchQuery)
    const { t } = useTranslation()

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                py: 1,
                gap: 1,
            }}
        >
            <TextField
                fullWidth
                placeholder={t('users.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />
            <Divider orientation="vertical" flexItem sx={{ opacity: 0.3 }} />
            <IconButton
                size="small"
                sx={{
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'common.white',
                    },
                }}
            >
                <TuneIcon fontSize="small" />
            </IconButton>
        </Paper>
    )
}

export default UsersSearch
