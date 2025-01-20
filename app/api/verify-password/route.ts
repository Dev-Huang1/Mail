import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === process.env.ACCESS_PASSWORD) {
    const response = NextResponse.json('OK', { status: 200 })
    response.cookies.set('access_token', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 5 * 60,
    })

    return response
  }

  return new NextResponse('Unauthorized', { status: 401 })
}
