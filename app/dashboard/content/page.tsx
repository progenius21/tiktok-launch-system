export default function ContentPage() {
  const columns = [
    { label: 'Draft', status: 'draft' },
    { label: 'Ready', status: 'ready' },
    { label: 'Scheduled', status: 'scheduled' },
    { label: 'Posted', status: 'posted' },
  ] as const;

  return (
    <div>
      <div className="dash-title">CONTENT PIPELINE</div>
      <p style={{ color: 'var(--warm-grey)', fontSize: 13, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
        Manage your content from idea to posted. Move pieces through the pipeline as you
        build, review, schedule, and publish.
      </p>

      <div className="dash-pipeline">
        {columns.map((col) => (
          <div key={col.status} className="pipeline-col">
            <div className="pipeline-header">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--off-white)' }}>
                {col.label}
              </span>
              <span className="pipeline-count">0</span>
            </div>
            <div className="pipeline-items">
              <div className="pipeline-empty">Nothing here yet</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
