'use client'

import { Form, Input, Button, Typography, notification } from 'antd'
import Link from 'next/link'
import { registerRequest } from '@/lib/redux/features/auth/slice'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/redux/hook'

const { Title } = Typography

const RegisterPage = () => {
	const [form] = Form.useForm()
	const dispatch = useAppDispatch()
	const router = useRouter()

	const validateConfirmPassword = async (_: any, value: any) => {
		const password = form.getFieldValue('password')
		if (value && password && value !== password) {
			throw new Error('Passwords do not match!')
		}
		return Promise.resolve()
	}

	const validateEmail = async (_: any, value: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (value && !emailRegex.test(value)) {
			throw new Error('Please enter a valid email address!')
		}
		return Promise.resolve()
	}

	const validatePassword = async (_: any, value: string) => {
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
		if (value && !passwordRegex.test(value)) {
			throw new Error('Password must be at least 6 characters and include both letters and numbers.')
		}
		return Promise.resolve()
	}

	const onFinish = (values: any) => {
		const registerPayload = {
			email: values.email,
			password: values.password,
			confirmPassword: values.confirmPassword,
			firstName: values.firstName,
			lastName: values.lastName
		}

		dispatch(
			registerRequest({
				payload: registerPayload,
				cb: (res) => {
					if (res.success) {
						router.push('/')
						notification.success({ message: 'Registration successful!' })
					} else {
						notification.error({ message: res.error || 'Registration failed' })
					}
				}
			})
		)
	}

	return (
		<div className='register-container'>
			<div className='register-card'>
				<Title level={2} className='register-title'>
					Register
				</Title>
				<Form form={form} name='register' onFinish={onFinish} layout='vertical' initialValues={{}}>
					<Form.Item
						name='firstName'
						label='First Name'
						rules={[
							{ required: true, message: 'Please input your first name!' },
							{ min: 2, message: 'First name must be at least 2 characters!' }
						]}
					>
						<Input placeholder='Enter your first name' />
					</Form.Item>

					<Form.Item
						name='lastName'
						label='Last Name'
						rules={[
							{ required: true, message: 'Please input your last name!' },
							{ min: 2, message: 'Last name must be at least 2 characters!' }
						]}
					>
						<Input placeholder='Enter your last name' />
					</Form.Item>

					<Form.Item
						name='email'
						label='Email'
						rules={[{ required: true, message: 'Please input your email!' }, { validator: validateEmail }]}
					>
						<Input placeholder='Enter your email' />
					</Form.Item>

					<Form.Item
						name='password'
						label='Password'
						rules={[
							{ required: true, message: 'Please input your password!' },
							{ validator: validatePassword }
						]}
					>
						<Input.Password placeholder='Enter your password' />
					</Form.Item>

					<Form.Item
						name='confirmPassword'
						label='Confirm Password'
						rules={[
							{ required: true, message: 'Please confirm your password!' },
							{ validator: validateConfirmPassword }
						]}
					>
						<Input.Password placeholder='Confirm your password' />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' className='register-button'>
							Register
						</Button>
						<p className='login-link'>
							Already have an account? <Link href='/login'>Login here</Link>
						</p>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default RegisterPage
