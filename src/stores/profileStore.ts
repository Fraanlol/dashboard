import { create } from 'zustand'
import {
    getProfile,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
} from '@api/profiles-api'
import { useNotificationStore } from './notificationStore'
import { isDemoUser } from '@lib/demo'

export interface Profile {
    id: string
    email: string | null
    full_name?: string | null
    avatar_url?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    created_at?: string | null
    updated_at?: string | null
}

interface ProfileStore {
    profile: Profile | null
    loading: boolean
    error: string | null
    demoChanges: Partial<Profile> | null
    fetchProfile: (userId: string) => Promise<void>
    updateUserProfile: (
        userId: string,
        updates: Partial<Profile>
    ) => Promise<void>
    uploadUserAvatar: (userId: string, file: File) => Promise<void>
    getDisplayProfile: () => Profile | null
}

const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info'
) => {
    useNotificationStore.getState().show(message, type)
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
    profile: null,
    loading: false,
    error: null,
    demoChanges: null,

    fetchProfile: async (userId: string) => {
        set({ loading: true, error: null })
        try {
            const data = await getProfile(userId)
            set({ profile: data, loading: false, demoChanges: null })
        } catch (error: unknown) {
            const err = error as Error
            set({ error: err.message, loading: false })
            showNotification('Failed to load profile', 'error')
        }
    },

    updateUserProfile: async (userId: string, updates: Partial<Profile>) => {
        const { profile, demoChanges } = get()
        if (!profile) return

        if (isDemoUser(profile.email ?? undefined)) {
            set({
                demoChanges: { ...demoChanges, ...updates },
                loading: false,
            })
            showNotification(
                '✨ Demo Mode: Changes saved locally (refresh to reset)',
                'info'
            )
            return
        }

        set({ loading: true, error: null })
        try {
            const updatedProfile = await updateProfile(userId, updates)
            set({ profile: updatedProfile, loading: false })
            showNotification('Profile updated successfully!', 'success')
        } catch (error: unknown) {
            const err = error as Error
            set({ error: err.message, loading: false })
            showNotification('Failed to update profile', 'error')
        }
    },

    uploadUserAvatar: async (userId: string, file: File) => {
        const { profile, demoChanges } = get()
        if (!profile) return

        if (isDemoUser(profile.email ?? undefined)) {
            const previewUrl = URL.createObjectURL(file)
            set({
                demoChanges: { ...demoChanges, avatar_url: previewUrl },
                loading: false,
            })
            showNotification(
                '✨ Demo Mode: Avatar preview created (refresh to reset)',
                'info'
            )
            return
        }

        set({ loading: true, error: null })
        try {
            if (profile.avatar_url) {
                await deleteAvatar(profile.avatar_url)
            }

            const avatarUrl = await uploadAvatar(userId, file)
            const updatedProfile = await updateProfile(userId, {
                avatar_url: avatarUrl,
            })
            set({ profile: updatedProfile, loading: false })
            showNotification('Avatar uploaded successfully!', 'success')
        } catch (error: unknown) {
            const err = error as Error
            set({ error: err.message, loading: false })
            showNotification('Failed to upload avatar', 'error')
        }
    },

    getDisplayProfile: () => {
        const { profile, demoChanges } = get()
        if (!profile) return null

        if (isDemoUser(profile.email ?? undefined) && demoChanges) {
            return { ...profile, ...demoChanges }
        }

        return profile
    },
}))
