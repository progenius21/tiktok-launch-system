export default function AccountsPage() {
  return (
    <div>
      <h1 className="dash-title">ACCOUNTS</h1>
      <p className="dash-page-desc">
        Track your TikTok accounts, warm-up progress, and performance metrics in one place.
      </p>

      <div className="dash-empty-state" style={{ marginTop: 80 }}>
        <div className="dash-empty-icon" aria-hidden="true">◎</div>
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
