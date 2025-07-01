// do not use this anymore
'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Auth } from '@/storages/Auth'
import { RESTRICTED_PATHS } from '@/config/constant'

export const useAuthGuard = () => {
	const router = useRouter()
	const pathname = usePathname()
	const [checking, setChecking] = useState(true)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const checkAuthStatus = () => {
			const user = Auth.getUser()
			const isLogin = !!user

			setIsAuthenticated(isLogin)

			const isRestricted = RESTRICTED_PATHS.includes(pathname)

			if (isRestricted && !isLogin) {
				router.replace(`/login?next=${encodeURIComponent(pathname)}`)
			} else {
				setChecking(false)
			}
		}

		checkAuthStatus()
	}, [pathname])

	return { checking, isAuthenticated }
}
