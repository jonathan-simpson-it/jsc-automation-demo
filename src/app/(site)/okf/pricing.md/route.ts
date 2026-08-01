import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.redirect(
    new URL('/okf/engagement.md', process.env.NEXT_PUBLIC_SITE_URL || 'https://automation.jonathansimpson.co'),
    { status: 301 }
  )
}
