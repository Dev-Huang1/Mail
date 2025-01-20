import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === process.env.ACCESS_PASSWORD) {
    // Set a cookie to remember the valid password
    cookies().set('access_token', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return new NextResponse('OK', { status: 200 })
  }

  return new NextResponse('Unauthorized', { status: 401 })
}
