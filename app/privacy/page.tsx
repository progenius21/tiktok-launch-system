import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | TikTok Launch System',
  description: 'Privacy policy for TikTok Launch System.',
  robots: { index: true },
};

export default function PrivacyPage() {
  return (
    <>
      <nav>
        <a className="nav-logo" href="/">
          TIKTOK<span>.</span>LAUNCH
        </a>
      </nav>

      <main style={{ paddingTop: 100, paddingBottom: 120 }}>
        <section style={{ borderBottom: 'none', maxWidth: 760 }}>
          <div className="section-tag">Legal</div>
          <div className="section-title">
            PRIVACY
            <br />
            POLICY
          </div>
          <p style={{ color: 'var(--warm-grey)', fontSize: 12, letterSpacing: '0.06em', marginBottom: 60 }}>
            Last updated: 27 March 2026
          </p>

          <div className="privacy-body">

            <div className="privacy-section">
              <h2 className="privacy-heading">WHO WE ARE</h2>
              <p>
                TikTok Launch System is operated by Matt Olapo. We provide a
                digital product and toolset to help app founders grow their user
                base using organic TikTok content. If you have questions about this
                policy, contact us at{' '}
                <a href="mailto:mattolapo21@gmail.com" className="privacy-link">
                  mattolapo21@gmail.com
                </a>
                .
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-heading">WHAT WE COLLECT</h2>
              <p>We collect the following categories of personal data:</p>
              <ul className="privacy-list">
                <li>
                  <strong>Email address</strong> when you purchase the product,
                  sign up for the free checklist, or contact us directly.
                </li>
                <li>
                  <strong>Payment information</strong> processed securely by our
                  payment provider. We do not store card details on our servers.
                </li>
                <li>
                  <strong>Usage data</strong> collected automatically when you
                  visit the site, including browser type, pages visited, and time
                  spent. This is processed in aggregate and not linked to
                  individual identity unless you are logged in.
                </li>
                <li>
                  <strong>Dashboard data</strong> you voluntarily enter, such as
                  TikTok account usernames, hook text, and content notes.
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-heading">HOW WE USE YOUR INFORMATION</h2>
              <ul className="privacy-list">
                <li>To deliver the product you purchased and send access details.</li>
                <li>
                  To send you the free Account Warm-Up Checklist if you requested
                  it via the lead capture form.
                </li>
                <li>
                  To send occasional product updates and relevant content. You can
                  unsubscribe at any time via the link in any email.
                </li>
                <li>To operate and improve the dashboard and associated tools.</li>
                <li>To respond to support requests you send us.</li>
              </ul>
              <p>We do not sell your personal data to third parties.</p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-heading">PAYMENT PROCESSING</h2>
              <p>
                All payments are processed by{' '}
                <strong>Stripe, Inc.</strong> Stripe collects and processes your
                payment details in accordance with their own privacy policy and PCI
                DSS compliance standards. We receive only confirmation of payment
                and your email address from Stripe. View Stripe's privacy policy at{' '}
                <span style={{ color: 'var(--warm-grey)' }}>stripe.com/privacy</span>.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-heading">THIRD-PARTY SERVICES</h2>
              <p>We use the following third-party services to operate this site:</p>
              <ul className="privacy-list">
                <li>
                  <strong>Stripe</strong> for payment processing.
                </li>
                <li>
                  <strong>Resend</strong> for transactional email delivery.
                </li>
                <li>
                  <strong>Supabase</strong> for database storage (dashboard
                  features only).
                </li>
                <li>
                  <strong>Vercel</strong> for hosting and deployment.
                </li>
              </ul>
              <p>
                Each of these providers operates under their own privacy policies
                and data processing agreements.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-heading">ANALYTICS</h2>
              <p>
                We use <strong>Vercel Analytics</strong> to understand how visitors
                use the site. This collects aggregated, anonymised data about page
                views and navigation patterns. No cookies are set for analytics
                purposes and no personally identifiable information is collected
                or shared with advertising networks.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-heading">DATA RETENTION</h2>
              <p>
                We retain your email address and purchase record for as long as
                your account is active or as required to fulfil legal obligations.
                Dashboard data you create is retained until you delete it or
                request account deletion. You may request deletion of your data at
                any time by contacting us.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-heading">YOUR RIGHTS</h2>
              <p>
                Depending on your location, you may have the following rights
                regarding your personal data:
              </p>
              <ul className="privacy-list">
                <li>The right to access the data we hold about you.</li>
                <li>The right to correct inaccurate data.</li>
                <li>The right to request deletion of your data.</li>
                <li>
                  The right to withdraw consent for marketing communications at
                  any time.
                </li>
                <li>
                  The right to lodge a complaint with a supervisory authority if
                  you are in the EU or UK.
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:mattolapo21@gmail.com" className="privacy-link">
                  mattolapo21@gmail.com
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-heading">CONTACT</h2>
              <p>
                For any privacy-related questions or requests, reach us at:
              </p>
              <p style={{ marginTop: 12 }}>
                <a href="mailto:mattolapo21@gmail.com" className="privacy-link">
                  mattolapo21@gmail.com
                </a>
              </p>
            </div>

          </div>
        </section>
      </main>

      <footer>
        <a className="footer-logo" href="/">
          TIKTOK<span>.</span>LAUNCH
        </a>
        <span className="footer-copy">© 2026 · All rights reserved</span>
      </footer>
    </>
  );
}
