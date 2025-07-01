import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PUBLIC_PATHS } from '@/config/constant'

export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('authToken')?.value
	const { pathname } = request.nextUrl
	const isPublicPath = PUBLIC_PATHS.includes(pathname)
	console.log(accessToken, isPublicPath, pathname)

	if (accessToken && isPublicPath && pathname !== '/') {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (!accessToken && !isPublicPath) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
