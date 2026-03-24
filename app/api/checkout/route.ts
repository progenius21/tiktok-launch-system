import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST() {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'TikTok Launch System',
              description:
                'The complete system to take your app from 0 to 10,000 users with zero ad spend.',
            },
            unit_amount: 14900,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: baseUrl,
      metadata: {
        product: 'TikTok Launch System',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout session error:', err?.message || err);
    return NextResponse.json(
      { error: 'Failed to create checkout session', detail: err?.message || String(err) },
      { status: 500 }
    );
  }
}
