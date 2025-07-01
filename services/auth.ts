import axios from '../utils/axios'
import { RefreshTokenPayload, RegisterPayload } from '@/lib/redux/features/auth/slice'

export const loginApi = async (email: string, password: string) => await axios.post('/auth/login', { email, password })

export const logoutApi = async () => await axios.post('/auth/logout')

export const registerApi = async (payload: RegisterPayload) => await axios.post('/auth/register', payload)

export const refreshTokenApi = async (payload: RefreshTokenPayload) => await axios.post('/auth/refresh-token', payload)
