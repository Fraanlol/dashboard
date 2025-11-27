import { useMediaQuery, useTheme } from '@mui/material'
import { User } from '@stores/usersStore'
import TableDesktopUsers from './usersTable/TableDesktopUsers'
import TableMobileUsers from './usersTable/TableMobileUsers'

export default function UsersTable({
    users,
    isLoading,
    isError,
    refetch,
}: {
    users: User[]
    isLoading: boolean
    isError: boolean
    refetch: () => void
}) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    if (isMobile) {
        return (
            <TableMobileUsers
                users={users}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        )
    }

    return (
        <TableDesktopUsers
            users={users}
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
        />
    )
}
