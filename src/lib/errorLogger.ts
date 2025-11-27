import { ErrorInfo } from 'react'

/**
 * Error Logger Utility
 *
 * Centralized error logging for the application.
 * Logs to console in development and can be extended to send to external services.
 */

interface ErrorContext {
    error: Error
    errorInfo?: ErrorInfo
    context?: Record<string, unknown>
}

/**
 * Log an error to console and external services
 */
export function logError({ error, errorInfo, context }: ErrorContext): void {
    const isDevelopment = import.meta.env.DEV

    // Always log to console in development
    if (isDevelopment) {
        console.group('🚨 Error Caught')
        console.error('Error:', error)
        if (errorInfo) {
            console.error('Component Stack:', errorInfo.componentStack)
        }
        if (context) {
            console.error('Additional Context:', context)
        }
        console.groupEnd()
    }

    // In production, send to error reporting service
    if (!isDevelopment) {
        // TODO: Integrate with error reporting service
        // Examples:

        // Sentry
        // if (window.Sentry) {
        //     window.Sentry.captureException(error, {
        //         contexts: {
        //             react: {
        //                 componentStack: errorInfo?.componentStack,
        //             },
        //         },
        //         extra: context,
        //     })
        // }

        // LogRocket
        // if (window.LogRocket) {
        //     window.LogRocket.captureException(error, {
        //         extra: {
        //             componentStack: errorInfo?.componentStack,
        //             ...context,
        //         },
        //     })
        // }

        // For now, log to console even in production
        console.error('Error:', error, errorInfo, context)
    }
}

/**
 * Log a warning (non-fatal error)
 */
export function logWarning(
    message: string,
    context?: Record<string, unknown>
): void {
    const isDevelopment = import.meta.env.DEV

    if (isDevelopment) {
        console.warn('⚠️ Warning:', message, context)
    }

    // TODO: Send warnings to monitoring service if needed
}
