import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import {
	loginRequest,
	loginSuccess,
	loginFailure,
	logoutRequest,
	logoutSuccess,
	registerRequest,
	refreshTokenRequest
} from './slice'
import { DecodeUser, User } from '@/types/user'
import { jwtDecode } from 'jwt-decode'
import { loginApi, logoutApi, refreshTokenApi, registerApi } from '@/services/auth'

function* handleLogin(action: ReturnType<typeof loginRequest>) {
	try {
		const response: AxiosResponse<{ user: User; accessToken: string; refreshToken: string }> = yield call(
			loginApi,
			action.payload.email,
			action.payload.password
		)

		const { accessToken, refreshToken } = response.data

		Cookies.set('accessToken', accessToken, { expires: 7 })
		Cookies.set('refreshToken', refreshToken, { expires: 30 })

		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('refreshToken', refreshToken)
		Cookies.set('authToken', accessToken)
		const decodedUser: DecodeUser = jwtDecode(accessToken)
		const user = {
			id: decodedUser.sub,
			email: decodedUser.email
		}
		yield put(loginSuccess({ user, accessToken, refreshToken }))

		if (action.payload.cb) {
			action.payload.cb({ success: true })
		}
	} catch (error: any) {
		const errorMessage = error.response?.data?.message || 'An unknown error occurred'
		yield put(loginFailure(errorMessage))
		if (action.payload.cb) {
			action.payload.cb({ success: false, error: errorMessage })
		}
	}
}

function* handleRegister(action: ReturnType<typeof registerRequest>) {
	try {
		const response: AxiosResponse<{ success: boolean }> = yield call(registerApi, action.payload.payload)

		const { success } = response.data
		if (action.payload.cb) {
			action.payload.cb({ success })
		}
	} catch (error: any) {
		const errorMessage = error.response?.data?.message || 'An unknown error occurred'
		yield put(loginFailure(errorMessage))
		if (action.payload.cb) {
			action.payload.cb({ success: false, error: errorMessage })
		}
	}
}

function* handleRefreshToken(action: ReturnType<typeof refreshTokenRequest>) {
	try {
		const response: AxiosResponse<{ accessToken: string; refreshToken: string }> = yield call(
			refreshTokenApi,
			action.payload.payload
		)

		const { accessToken, refreshToken } = response.data
		if (action.payload.cb) {
			action.payload.cb({ accessToken, refreshToken })
		}

		return { accessToken, refreshToken }
	} catch (error: any) {
		const errorMessage = error.response?.data?.message || 'An unknown error occurred'
		yield put(loginFailure(errorMessage))
		if (action.payload.cb) {
			action.payload.cb({ accessToken: '', refreshToken: '', error: errorMessage })
		}
	}
}

function* handleLogout() {
	try {
		yield call(logoutApi)
	} catch (error) {
		console.error('Logout API failed, proceeding with client-side logout.', error)
	} finally {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		Cookies.remove('accessToken')
		Cookies.remove('refreshToken')
		Cookies.remove('authToken')
		yield put(logoutSuccess())
	}
}

export function* authSaga() {
	yield takeLatest(loginRequest.type, handleLogin)
	yield takeLatest(registerRequest.type, handleRegister)
	yield takeLatest(logoutRequest.type, handleLogout)
	yield takeLatest(refreshTokenRequest.type, handleRefreshToken)
}
