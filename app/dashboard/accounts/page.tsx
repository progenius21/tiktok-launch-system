export default function AccountsPage() {
  return (
    <div>
      <div className="dash-title">ACCOUNTS</div>
      <p style={{ color: 'var(--warm-grey)', fontSize: 13, lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
        Track your TikTok accounts, warm-up progress, and performance metrics in one place.
      </p>

      <div className="dash-empty-state" style={{ marginTop: 80 }}>
        <div className="dash-empty-icon">◎</div>
        <div className="dash-empty-text">No accounts added yet</div>
        <div className="dash-empty-sub">
          Account management is coming in the next release.
          <br />
          Follow the warm-up protocol from your guide to prepare your accounts.
        </div>
      </div>
    </div>
  );
}
