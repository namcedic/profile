import { all } from 'redux-saga/effects'
import { authSaga } from '@/lib/redux/features/auth/saga'

export function* rootSaga() {
	yield all([authSaga()])
}
