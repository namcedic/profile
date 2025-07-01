'use client'

import React from 'react'
import { Form, Input, Button, Card, Typography, Spin, Alert, message, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook'
import { loginRequest } from '@/lib/redux/features/auth/slice'
import { useRouter } from 'next/navigation'

const { Title } = Typography

const LoginPage = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth)

	const onFinish = (values: any) => {
		dispatch(
			loginRequest({
				email: values.email,
				password: values.password,
				cb: (res) => {
					if (res.success) {
						router.push('/')
						notification.success({ message: 'Login successful!' })
					} else {
						notification.error({ message: res.error || 'Login failed' })
					}
				}
			})
		)
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				background: '#f0f2f5'
			}}
		>
			<Card style={{ width: 400 }}>
				<Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
					Login
				</Title>
				<Form name='normal_login' initialValues={{ remember: true }} onFinish={onFinish}>
					<Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
						<Input prefix={<UserOutlined />} placeholder='Email' />
					</Form.Item>
					<Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
						<Input.Password prefix={<LockOutlined />} placeholder='Password (123456)' />
					</Form.Item>

					{/*{error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}*/}

					<Form.Item>
						<Button type='primary' htmlType='submit' style={{ width: '100%' }} disabled={loading}>
							{loading ? <Spin /> : 'Log in'}
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}

export default LoginPage
