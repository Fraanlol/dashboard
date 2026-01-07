import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'

interface AuthStore {
    user: User | null
    session: Session | null
    loading: boolean
    initialized: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (
        email: string,
        password: string,
        fullName?: string
    ) => Promise<void>
    signOut: () => Promise<void>
    initialize: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    session: null,
    loading: false,
    initialized: false,

    initialize: async () => {
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            set({
                session,
                user: session?.user ?? null,
                initialized: true,
            })

            supabase.auth.onAuthStateChange(
                (_event: AuthChangeEvent, session: Session | null) => {
                    set({
                        session,
                        user: session?.user ?? null,
                    })
                }
            )
        } catch (error) {
            console.error('Error initializing auth:', error)
            set({ initialized: true })
        }
    },

    signIn: async (email: string, password: string) => {
        set({ loading: true })
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            set({
                user: data.user,
                session: data.session,
                loading: false,
            })
        } catch (error: unknown) {
            set({ loading: false })
            const err = error as Error
            throw new Error(err.message || 'Invalid email or password')
        }
    },

    signUp: async (email: string, password: string, fullName: string = '') => {
        set({ loading: true })
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            })

            if (error) throw error

            set({
                user: data.user,
                session: data.session,
                loading: false,
            })
        } catch (error: unknown) {
            set({ loading: false })
            const err = error as Error
            throw new Error(err.message || 'Error creating account')
        }
    },

    signOut: async () => {
        set({ loading: true })
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error

            set({
                user: null,
                session: null,
                loading: false,
            })
        } catch (error: unknown) {
            set({ loading: false })
            const err = error as Error
            throw new Error(err.message || 'Error signing out')
        }
    },
}))
