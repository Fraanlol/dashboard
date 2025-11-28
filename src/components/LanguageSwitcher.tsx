import React from 'react'
import {
    Select,
    MenuItem,
    FormControl,
    Box,
    Typography,
    SelectChangeEvent,
} from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag'
import i18n, { changeLanguage } from '../i18n/config'
import { US, AR } from 'country-flag-icons/react/3x2'

const LANGS: { code: string; label: string; flag?: React.ElementType }[] = [
    { code: 'en', label: 'EN: United States', flag: US },
    { code: 'es', label: 'ES: Argentina', flag: AR },
    { code: 'placeho', label: 'Test' },
]

const LanguageSwitcher: React.FC = () => {
    const [lang, setLang] = React.useState<string>(i18n.language || 'en')

    React.useEffect(() => {
        const handle = () => setLang(i18n.language || 'en')
        i18n.on('languageChanged', handle)
        return () => i18n.off('languageChanged', handle)
    }, [])

    const handleChange = async (event: SelectChangeEvent<string>) => {
        const newLang = event.target.value
        setLang(newLang)
        await changeLanguage(newLang)
    }

    const current = LANGS.find((l) => l.code === lang) || LANGS[0]

    return (
        <FormControl size="small">
            <Select
                value={lang}
                onChange={handleChange}
                variant="standard"
                displayEmpty
                renderValue={() => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {current.flag && (
                            <current.flag
                                title={current.label}
                                width={20}
                                height={15}
                            />
                        )}
                    </Box>
                )}
                sx={{
                    '& .MuiSelect-select': {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        pl: 0,
                    },
                }}
            >
                {LANGS.map((l) => (
                    <MenuItem
                        key={l.code}
                        value={l.code}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        {l.flag && (
                            <l.flag title={l.label} width={20} height={15} />
                        )}
                        <Typography variant="body2">{l.label}</Typography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSwitcher
