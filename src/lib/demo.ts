/**
 * Demo Mode Configuration
 *
 * To disable demo mode in production:
 * 1. Set VITE_DEMO_MODE=false in .env
 * 2. Or remove VITE_DEMO_MODE entirely
 */

export const DEMO_CONFIG = {
    enabled: import.meta.env.VITE_DEMO_MODE === 'true',
    demoEmail: import.meta.env.VITE_DEMO_EMAIL || 'demo@example.com',
} as const

export const isDemoUser = (email?: string | null): boolean => {
    if (!DEMO_CONFIG.enabled) return false
    return email === DEMO_CONFIG.demoEmail
}
