'use client'

import React, { useState } from 'react'
import styles from './register-without-antd.module.scss'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch } from '@/lib/redux/hook'
import { registerRequest } from '@/lib/redux/features/auth/slice'
import { notification } from 'antd'

const RegisterPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
		setErrors({ ...errors, [name]: '' })
	}

	const validate = () => {
		const newErrors: { [key: string]: string } = {}
		if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
		if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
		if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email'
		if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/))
			newErrors.password = 'Password must be at least 6 characters and include letters and numbers'
		if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return

		dispatch(
			registerRequest({
				payload: formData,
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
			<div className={styles.card}>
				<h2 className={styles.title}>Register</h2>
				<form onSubmit={handleSubmit} noValidate>
					<div className={styles.formGroup}>
						<label>
							<span className={styles.star_require}>*</span> First Name
						</label>
						<input type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
						{errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
					</div>

					<div className={styles.formGroup}>
						<label>
							<span className={styles.star_require}>*</span> Last Name
						</label>
						<input type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
						{errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
					</div>

					<div className={styles.formGroup}>
						<label>
							<span className={styles.star_require}>*</span> Email
						</label>
						<input type='email' name='email' value={formData.email} onChange={handleChange} />
						{errors.email && <p className={styles.error}>{errors.email}</p>}
					</div>

					<div className={styles.formGroup}>
						<label>
							<span className={styles.star_require}>*</span> Password
						</label>
						<input type='password' name='password' value={formData.password} onChange={handleChange} />
						{errors.password && <p className={styles.error}>{errors.password}</p>}
					</div>

					<div className={styles.formGroup}>
						<label>
							<span className={styles.star_require}>*</span> Confirm Password
						</label>
						<input
							type='password'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
						{errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
					</div>

					<button type='submit' className={styles.registerButton}>
						Register
					</button>

					<p className={styles.loginLink}>
						Already have an account? <Link href='/login'>Login here</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default RegisterPage
