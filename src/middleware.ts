import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' 

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {            // AGR DONO  HAI TO HOME PE  REDIRECT KRO
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {          // AGR LOGOUT H TB BHEJO LOGIN PE
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}


export const config = {
  matcher: [                    // JITNE BHI PAGES HAI WO.
    '/',
    '/profile',
    '/login',
    '/signup',
    
  ]
}