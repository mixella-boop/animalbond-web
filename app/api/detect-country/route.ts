import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET() {
  const headersList = await headers()
  const country = headersList.get('x-vercel-ip-country') || ''
  return NextResponse.json({ country: country.toUpperCase() })
}
