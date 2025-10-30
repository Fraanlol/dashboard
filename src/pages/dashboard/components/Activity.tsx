import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    timelineItemClasses,
} from '@mui/lab'
import { Button, Box, Typography, Grid } from '@mui/material'

const data = [
    { time: '09:30 AM', event: 'User John added a new product' },
    { time: '11:00 AM', event: 'New order placed (ID #3241)' },
    { time: '01:15 PM', event: 'Server backup completed' },
    { time: '03:45 PM', event: 'New user registered: Alice' },
    { time: '05:00 PM', event: 'Password changed for user Mike' },
]

export default function Activity() {
    return (
        <Grid
            container
            direction={{ xs: 'column' }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ width: '100%', mb: 2 }}
            className="flex-1"
        >
            <div className=" text-gray-600 self-start">
                <h2 className="fade-in font-bold text-lg">Recent Activity</h2>
            </div>
            <Timeline
                position="right"
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}
            >
                {data.map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot color="primary" />
                            {index < data.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography className="text-xs text-gray-500 pb-1">
                                {item.time}
                            </Typography>
                            <Typography className="text-xs">
                                {item.event}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
            <Box className="flex justify-center">
                <Button variant="outlined">Load More</Button>
            </Box>
        </Grid>
    )
}
