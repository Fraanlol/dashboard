import { Box, Typography, Link, Divider } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <Box
            component="footer"
            sx={{
                mt: 5,
                py: 3,
                px: 2,
                bgcolor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    gap: 2,
                    maxWidth: 1200,
                    mx: 'auto',
                }}
            >
                {/* Left side - Copyright */}
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant="body2" color="text.secondary">
                        © {currentYear} Dashboard. All rights reserved.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Built with React, TypeScript & Material-UI
                    </Typography>
                </Box>

                {/* Center - Links */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <Link
                        href="#"
                        underline="hover"
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                    >
                        About
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                    >
                        Privacy
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                    >
                        Terms
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                    >
                        Contact
                    </Link>
                </Box>

                {/* Right side - Social icons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="text.secondary"
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <GitHubIcon />
                    </Link>
                    <Link
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="text.secondary"
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <LinkedInIcon />
                    </Link>
                    <Link
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="text.secondary"
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <TwitterIcon />
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}
