import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useUsersStore } from '@stores/usersStore'

const UsersSearch = () => {
    const searchQuery = useUsersStore((state) => state.searchQuery)
    const setSearchQuery = useUsersStore((state) => state.setSearchQuery)

    return (
        <TextField
            fullWidth
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{ mb: 3 }}
        />
    )
}

export default UsersSearch
