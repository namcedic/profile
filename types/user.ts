export interface User {
	id: string
	email: string
}

export interface DecodeUser {
	sub: string
	email: string
}

export interface DecodePayload extends DecodeUser {
	iat: number
	exp: number
}
