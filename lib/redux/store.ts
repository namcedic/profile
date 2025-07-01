import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '@/lib/redux/rootSaga'
import authReducer from '@/lib/redux/features/auth/slice'

const sagaMiddleware = createSagaMiddleware()

export const makeStore = () => {
	const store = configureStore({
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
		reducer: {
			auth: authReducer
		}
	})

	sagaMiddleware.run(rootSaga)
	return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
