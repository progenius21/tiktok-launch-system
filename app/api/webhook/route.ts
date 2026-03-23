import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendDeliveryEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  if (!stripe) {
    console.error('Webhook received but Stripe is not configured');
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    );
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Missing stripe-signature header or STRIPE_WEBHOOK_SECRET');
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email =
      session.customer_details?.email ?? session.customer_email ?? null;

    if (email) {
      try {
        await sendDeliveryEmail(email);
        console.log(`Purchase completed and delivery email sent: ${email}`);
      } catch (err) {
        console.error(`Failed to send delivery email to ${email}:`, err);
        // Return 200 so Stripe does not retry - the purchase was successful
      }
    } else {
      console.warn('checkout.session.completed: no customer email found', {
        sessionId: session.id,
      });
    }
  }

  return NextResponse.json({ received: true });
}
