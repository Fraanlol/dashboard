// Augment MUI theme types to include `palette.text.cards`
import '@mui/material/styles'

declare module '@mui/material/styles' {
    // TypeText is the interface used for `theme.palette.text`
    interface TypeText {
        cards?: string
    }
}

// If you use `theme.vars`/CssVars, consider augmenting ThemeVars types separately.
