import { keyframes } from '@emotion/react'

const fadeSlideKeyframes = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
    }
    70% {
        opacity: 1;
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`

const metricPulseKeyframes = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px) scale(0.96);
    }
    60% {
        opacity: 1;
        transform: translateY(0) scale(1.01);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`

export const fadeSlideIn = (delay = 0) => ({
    opacity: 0,
    animation: `${fadeSlideKeyframes} 0.55s cubic-bezier(0.33, 1, 0.68, 1) forwards`,
    animationDelay: `${delay}s`,
    willChange: 'opacity, transform',
    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,
        animation: 'none',
    },
})

export const metricPulse = (delay = 0.1) => ({
    animation: `${metricPulseKeyframes} 0.65s cubic-bezier(0.33, 1, 0.68, 1) both`,
    animationDelay: `${delay}s`,
    willChange: 'opacity, transform',
    '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
    },
})

export const hoverLift = {
    transition:
        'transform 220ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1), border-color 220ms ease',
    willChange: 'transform',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 18px 35px rgba(15, 23, 42, 0.08)',
        borderColor: 'primary.main',
    },
    '&:focus-visible': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: '3px',
    },
}
