import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TikTok Launch System",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
  return (
    <div style={{
      background: "var(--black)",
      color: "var(--off-white)",
      minHeight: "100vh",
      padding: "80px 24px",
      fontFamily: "var(--font-mono)",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <a href="/" style={{
          color: "var(--warm-grey)",
          fontSize: 13,
          textDecoration: "none",
          letterSpacing: "0.06em",
          display: "block",
          marginBottom: 40,
        }}>
          &larr; Back to TikTok Launch System
        </a>

        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: 36,
          lineHeight: 1.1,
          marginBottom: 8,
        }}>PRIVACY POLICY</h1>
        <p style={{
          color: "var(--warm-grey)",
          fontSize: 13,
          marginBottom: 48,
        }}>Last updated: 25 March 2026</p>

        <Section title="Who we are">
          TikTok Launch System is a digital product operated by Progenius Group.
          When we say &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our,&rdquo; we mean the team behind
          TikTok Launch System.
        </Section>

        <Section title="What we collect">
          We collect the minimum information needed to deliver the product and communicate with you.
          This includes your email address (provided at checkout or via the free checklist sign-up)
          and payment information processed securely through Stripe. We do not store your card details
          on our servers.
        </Section>

        <Section title="How we use your information">
          Your email address is used to deliver the product (PDF guide, Notion access, and community link),
          send the free Account Warm-Up Checklist if you opted in, and send occasional product updates
          or related content. You can unsubscribe from marketing emails at any time.
        </Section>

        <Section title="Payment processing">
          All payments are processed by Stripe. Your payment information is handled directly by Stripe
          and is subject to their privacy policy at stripe.com/privacy. We receive confirmation of your
          payment and your email address from Stripe, but never your full card number.
        </Section>

        <Section title="Third-party services">
          We use the following third-party services: Stripe for payment processing, Resend for email
          delivery, Vercel for website hosting and analytics, Notion for guide hosting, and Telegram
          for the private community. Each service has its own privacy policy governing how they handle
          your data.
        </Section>

        <Section title="Analytics">
          We use Vercel Analytics to understand how visitors interact with our website. This collects
          anonymised usage data such as page views, referrers, and device type. No personally
          identifiable information is collected through analytics. Vercel Analytics does not use
          cookies and is GDPR compliant.
        </Section>

        <Section title="Data retention">
          We retain your email address for as long as you remain a customer or subscriber. If you
          request deletion, we will remove your email from our systems within 30 days. Payment
          records are retained as required by applicable tax and financial regulations.
        </Section>

        <Section title="Your rights">
          You have the right to access, correct, or delete your personal data. You can unsubscribe
          from emails at any time using the unsubscribe link in any email. To request data deletion
          or access, contact us at the email below.
        </Section>

        <Section title="Contact">
          For any privacy-related questions, contact us at mattolapo21@gmail.com.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{
        fontFamily: "var(--font-heading)",
        fontSize: 18,
        color: "var(--accent)",
        marginBottom: 12,
        letterSpacing: "0.04em",
      }}>{title.toUpperCase()}</h2>
      <p style={{
        fontSize: 14,
        lineHeight: 1.8,
        color: "var(--off-white)",
        opacity: 0.85,
      }}>{children}</p>
    </div>
  );
}
