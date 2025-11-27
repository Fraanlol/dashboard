import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    timelineItemClasses,
} from '@mui/lab'
import { Button, Box, Typography, Grid, Paper, alpha } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BackupIcon from '@mui/icons-material/Backup'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import { useTranslation } from 'react-i18next'

export default function Activity() {
    const { t } = useTranslation()
    const data = [
        {
            time: t('dashboard.activity.time1'),
            event: t('dashboard.activity.event1'),
            icon: <PersonAddIcon fontSize="small" />,
            color: 'success' as const,
        },
        {
            time: t('dashboard.activity.time2'),
            event: t('dashboard.activity.event2'),
            icon: <ShoppingCartIcon fontSize="small" />,
            color: 'primary' as const,
        },
        {
            time: t('dashboard.activity.time3'),
            event: t('dashboard.activity.event3'),
            icon: <BackupIcon fontSize="small" />,
            color: 'info' as const,
        },
        {
            time: t('dashboard.activity.time4'),
            event: t('dashboard.activity.event4'),
            icon: <AccountCircleIcon fontSize="small" />,
            color: 'success' as const,
        },
        {
            time: t('dashboard.activity.time5'),
            event: t('dashboard.activity.event5'),
            icon: <LockIcon fontSize="small" />,
            color: 'warning' as const,
        },
    ]
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                    {t('dashboard.activity.title')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('dashboard.activity.subtitle')}
                </Typography>
            </Box>

            {/* Timeline */}
            <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
                <Timeline
                    position="right"
                    sx={{
                        m: 0,
                        p: 0,
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                    }}
                >
                    {data.map((item, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot
                                    color={item.color}
                                    sx={{
                                        boxShadow: (theme) =>
                                            `0 0 0 4px ${alpha(
                                                theme.palette[item.color].main,
                                                0.1
                                            )}`,
                                    }}
                                >
                                    {item.icon}
                                </TimelineDot>
                                {index < data.length - 1 && (
                                    <TimelineConnector
                                        sx={{
                                            bgcolor: 'divider',
                                        }}
                                    />
                                )}
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: 1.5, px: 2 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        bgcolor: 'background.default',
                                        border: 1,
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                            borderColor: 'primary.light',
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: 'text.secondary',
                                            fontWeight: 600,
                                            display: 'block',
                                            mb: 0.5,
                                        }}
                                    >
                                        {item.time}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.primary',
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {item.event}
                                    </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Box>

            {/* Footer Button */}
            <Box
                sx={{
                    pt: 2,
                    textAlign: 'center',
                    borderTop: 1,
                    borderColor: 'divider',
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    {t('dashboard.activity.loadMore')}
                </Button>
            </Box>
        </Box>
    )
}
