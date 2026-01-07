import { supabase } from '../lib/supabase'

export interface Profile {
    id: string
    email: string | null
    full_name: string | null
    avatar_url: string | null
    bio: string | null
    phone: string | null
    location: string | null
    created_at: string
    updated_at: string
}

export interface UpdateProfileData {
    full_name?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    avatar_url?: string | null
}

export const getProfile = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        console.error('Error fetching profile:', error)
        throw new Error(error.message)
    }

    return data
}

export const updateProfile = async (
    userId: string,
    updates: UpdateProfileData
): Promise<Profile> => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

    if (error) {
        console.error('Error updating profile:', error)
        throw new Error(error.message)
    }

    return data
}

/**
 * Upload avatar image to Supabase Storage
 */
export const uploadAvatar = async (
    userId: string,
    file: File
): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
            upsert: true,
            contentType: file.type,
        })

    if (uploadError) {
        console.error('Error uploading avatar:', uploadError)
        throw new Error(uploadError.message)
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(fileName)

    return publicUrl
}

export const deleteAvatar = async (avatarUrl: string): Promise<void> => {
    const urlParts = avatarUrl.split('/avatars/')
    if (urlParts.length < 2) return

    const filePath = urlParts[1]

    const { error } = await supabase.storage.from('avatars').remove([filePath])

    if (error) {
        console.error('Error deleting avatar:', error)
        throw new Error(error.message)
    }
}
