import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/user'

export interface AuthState {
	isAuthenticated: boolean
	user: User | null
	accessToken: string | null
	refreshToken: string | null
	loading: boolean
	error: string | null
}

export interface RegisterPayload {
	email: string
	password: string
	confirmPassword: string
	firstName: string
	lastName: string
}

export interface RefreshTokenPayload {
	refreshToken: string
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	accessToken: null,
	refreshToken: null,
	loading: false,
	error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginRequest: (
			state,
			action: PayloadAction<{
				email: string
				password: string
				cb?: (result: { success: boolean; error?: string }) => void
			}>
		) => {
			state.loading = true
			state.error = null
		},
		loginSuccess: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
			state.isAuthenticated = true
			state.loading = false
			state.user = action.payload.user
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.isAuthenticated = false
			state.loading = false
			state.error = action.payload
			state.user = null
			state.accessToken = null
			state.refreshToken = null
		},

		registerRequest: (
			state,
			action: PayloadAction<{
				payload: RegisterPayload
				cb?: (result: { success: boolean; error?: string }) => void
			}>
		) => {},
		refreshTokenRequest: (
			state,
			action: PayloadAction<{
				payload: RefreshTokenPayload
				cb?: (result: { accessToken: string; refreshToken: string; error?: string }) => void
			}>
		) => {},
		logoutRequest: (state) => {
			state.loading = true
		},
		logoutSuccess: (state) => {
			state.isAuthenticated = false
			state.user = null
			state.refreshToken = null
			state.accessToken = null
			state.loading = false
		},
		loadAuthFromCookie: (
			state,
			action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>
		) => {
			state.isAuthenticated = true
			state.user = action.payload.user
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
		}
	}
})

export const {
	loginRequest,
	loginSuccess,
	loginFailure,
	registerRequest,
	refreshTokenRequest,
	logoutRequest,
	logoutSuccess,
	loadAuthFromCookie
} = authSlice.actions

export default authSlice.reducer
