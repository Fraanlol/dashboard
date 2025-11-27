import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import RefreshIcon from '@mui/icons-material/Refresh'
import HomeIcon from '@mui/icons-material/Home'
import { NavigateFunction } from 'react-router-dom'
import { logError } from '@lib/errorLogger'

interface Props {
    children: ReactNode
    fallback?: ReactNode
    navigate?: NavigateFunction
}

interface State {
    hasError: boolean
    error: Error | null
    errorInfo: ErrorInfo | null
}

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * Usage:
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
    private _isMounted = false

    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    }

    public componentDidMount() {
        this._isMounted = true
    }

    public componentWillUnmount() {
        this._isMounted = false
    }

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
            errorInfo: null,
        }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error using centralized logger
        logError({
            error,
            errorInfo,
            context: {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
            },
        })

        // Only update state if component is still mounted
        if (this._isMounted) {
            this.setState({
                error,
                errorInfo,
            })
        }
    }

    private handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        })
    }

    private handleReload = () => {
        window.location.reload()
    }

    private handleGoHome = () => {
        if (this.props.navigate) {
            // Use React Router - navigate will unmount/remount the tree
            this.props.navigate('/')
        } else {
            // Fallback to window.location
            window.location.href = '/'
        }
    }

    public render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default fallback UI
            return (
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.default',
                        p: 2,
                    }}
                >
                    <Container maxWidth="md">
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 3,
                            }}
                        >
                            {/* Error Icon */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: 'error.main',
                                        borderRadius: '50%',
                                        p: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ErrorOutlineIcon
                                        sx={{
                                            fontSize: 80,
                                            color: 'white',
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Error Message */}
                            <Typography
                                variant="h3"
                                component="h1"
                                gutterBottom
                                fontWeight={700}
                            >
                                Oops! Something went wrong
                            </Typography>

                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mb: 4 }}
                            >
                                We're sorry, but something unexpected happened.
                                <br />
                                Don't worry, our team has been notified.
                            </Typography>

                            {/* Error Details (Development only) */}
                            {process.env.NODE_ENV === 'development' &&
                                this.state.error && (
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            mb: 4,
                                            bgcolor: 'grey.100',
                                            textAlign: 'left',
                                            maxHeight: 200,
                                            overflow: 'auto',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            component="pre"
                                            sx={{
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {this.state.error.toString()}
                                            {this.state.errorInfo &&
                                                '\n\n' +
                                                    this.state.errorInfo
                                                        .componentStack}
                                        </Typography>
                                    </Paper>
                                )}

                            {/* Action Buttons */}
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<RefreshIcon />}
                                    onClick={this.handleReset}
                                >
                                    Try Again
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={this.handleReload}
                                >
                                    Reload Page
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<HomeIcon />}
                                    onClick={this.handleGoHome}
                                >
                                    Go Home
                                </Button>
                            </Stack>

                            {/* Help Text */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 4 }}
                            >
                                If the problem persists, please contact support.
                            </Typography>
                        </Paper>
                    </Container>
                </Box>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
