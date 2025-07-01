export const createActions = (name: string) => {
	const formatActionType = (action: string) => `${name.toUpperCase()}_${action}`

	const actionTypes = {
		REQUEST: formatActionType('REQUESTED'),
		START: formatActionType('STARTED'),
		SUCCESS: formatActionType('SUCCEEDED'),
		FAILURE: formatActionType('FAILED')
	}

	const createAction = (type: string) => () => ({ type })

	return {
		actionTypes,
		actionRequest: createAction(actionTypes.REQUEST),
		actionStart: createAction(actionTypes.START),
		actionSuccess: createAction(actionTypes.SUCCESS),
		actionFailure: createAction(actionTypes.FAILURE)
	}
}
