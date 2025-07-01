'use client'

import React from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hook'
import { Button, notification, Typography } from 'antd'
import Link from 'next/link'
import { logoutRequest } from '@/lib/redux/features/auth/slice'
import { useRouter } from 'next/navigation'

const { Text } = Typography

export const AppHeader = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { isAuthenticated, user } = useAppSelector((state) => state.auth)

	const handleLogout = () => {
		dispatch(logoutRequest())
		router.push('/login')
		notification.success({ message: 'Logout successful!' })
	}

	return (
		<header className='header-bar'>
			<Link href='/' passHref>
				<Text strong style={{ fontSize: '20px', cursor: 'pointer' }}>
					Cedric App
				</Text>
			</Link>
			<div>
				{isAuthenticated && user ? (
					<div className='user-info'>
						<p>Welcome {user.email}!</p>
						<Button type='primary' onClick={handleLogout}>
							Logout
						</Button>
					</div>
				) : (
					<>
						<Link href='/login' passHref>
							<Button type='primary' className='primary'>
								Login
							</Button>
						</Link>
						<Link href='/register' passHref>
							<Button type='link'>Register</Button>
						</Link>
					</>
				)}
			</div>
		</header>
	)
}
