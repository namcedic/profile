// do not use this anymore
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RootState } from '@/lib/redux/store'
import { Auth } from '@/storages/Auth'
import { RESTRICTED_PATHS } from '@/config/constant'
import { useAppSelector } from '@/lib/redux/hook'

interface CheckAuthProps {
	children: React.ReactNode
}

const CheckAuth: React.FC<CheckAuthProps> = ({ children }) => {
	const router = useRouter()
	const user = useAppSelector((state: RootState) => state.auth.user)
	const [allowView, setAllowView] = useState<boolean>(true)
	const [auth, setAuth] = useState<boolean>(false)

	useEffect(() => {
		const checkAuth = () => {
			if (typeof window === 'undefined') return

			const path = window.location.pathname
			const userSession = Auth.getUser()
			const isAuthenticated = !!userSession
			const isRestricted = RESTRICTED_PATHS.includes(path)
			const canView = !isRestricted || (isRestricted && isAuthenticated)
			setAllowView(canView)

			if (!canView) {
				router.push(`/login?next=${encodeURIComponent(path)}`)
			}
		}

		checkAuth()

		window.addEventListener('popstate', checkAuth)
		return () => window.removeEventListener('popstate', checkAuth)
	}, [])

	useEffect(() => {
		const handleRouteChange = async () => {
			const path = window.location.pathname
			const isLogin = Auth.getUser()
			const isAuthenticated = !!isLogin

			setAuth(isAuthenticated)
			const isRestricted = path.startsWith('/account')
			const canView = !isRestricted || (isRestricted && isAuthenticated)
			setAllowView(canView)

			if (!canView) {
				router.push(`/login?next=${encodeURIComponent(path)}`)
			}
		}

		window.addEventListener('popstate', handleRouteChange)
		return () => window.removeEventListener('popstate', handleRouteChange)
	}, [router])

	if (!allowView) {
		return null
	}

	return <>{children}</>
}

export default CheckAuth
