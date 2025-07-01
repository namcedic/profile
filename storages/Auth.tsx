'use client'
import { jwtDecode } from 'jwt-decode'
import { DecodeUser } from '@/types/user'

export class Auth {
	public static token: string | null = null

	static getAccessToken(): string {
		return localStorage.getItem('accessToken') || ''
	}

	static getUser() {
		if (typeof window === 'undefined') return null
		const accessToken = localStorage.getItem('accessToken')
		if (!accessToken) return null

		try {
			const decodedUser: DecodeUser = jwtDecode(accessToken)
			return {
				id: decodedUser.sub,
				email: decodedUser.email
			}
		} catch (e) {
			console.error('Invalid token', e)
			return null
		}
	}
}
