'use client'

import React from 'react'
import { useAppSelector } from '@/lib/redux/hook'
import { Typography, Card, Spin } from 'antd'

const { Title, Text } = Typography

const MePage = () => {
	const user = useAppSelector((state) => state.auth.user)

	return (
		<div>
			{user ? (
				<Card style={{ maxWidth: 600, margin: '100px auto' }}>
					<Title level={2}>Thông tin cá nhân</Title>
					<Text strong>Email:</Text>
					<p>{user.email}</p>
				</Card>
			) : null}
		</div>
	)
}

export default MePage
