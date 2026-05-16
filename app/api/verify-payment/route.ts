import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      )
    }

    // Retrieve payment link from Stripe to get metadata
    const paymentLinkResponse = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        },
      }
    )

    if (!paymentLinkResponse.ok) {
      console.error('Stripe session not found')
      return NextResponse.json(
        { error: 'Payment session not found' },
        { status: 404 }
      )
    }

    const session = await paymentLinkResponse.json()

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Get partner ID from metadata
    const partnerId = session.metadata?.partner_id

    if (!partnerId) {
      return NextResponse.json(
        { error: 'Invalid session metadata' },
        { status: 400 }
      )
    }

    // Update partner in database (mark as paid and active)
    const supabase = createClient()
    const { error: updateError } = await supabase
      .from('partners')
      .update({
        is_active: true,
        payment_status: 'paid',
        subscription_status: 'active',
      })
      .eq('id', partnerId)

    if (updateError) {
      console.error('Failed to update partner:', updateError)
      return NextResponse.json(
        { error: 'Failed to activate partnership' },
        { status: 500 }
      )
    }

    // Log payment session
    await supabase.from('payment_sessions').update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    }).eq('stripe_id', sessionId)

    return NextResponse.json(
      { success: true, partnerId },
      { status: 200 }
    )
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
