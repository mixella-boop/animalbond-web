import { NextRequest, NextResponse } from 'next/server'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Doar VERIFICĂ plata la Stripe pentru pagina de succes (read-only).
// Activarea partenerului în DB o face exclusiv edge function-ul stripe-webhook
// (service role + semnătură Stripe) — aici nu scriem nimic în baza de date.
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId || typeof sessionId !== 'string' || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
      return NextResponse.json({ error: 'Missing or invalid sessionId' }, { status: 400 })
    }

    const stripeResponse = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
      }
    )

    if (!stripeResponse.ok) {
      return NextResponse.json({ error: 'Payment session not found' }, { status: 404 })
    }

    const session = await stripeResponse.json()

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    const partnerId = session.metadata?.partner_id
    if (!partnerId) {
      return NextResponse.json({ error: 'Invalid session metadata' }, { status: 400 })
    }

    return NextResponse.json({ success: true, partnerId }, { status: 200 })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
