export default function ContentPage() {
  const columns = [
    { label: 'Draft', status: 'draft' },
    { label: 'Ready', status: 'ready' },
    { label: 'Scheduled', status: 'scheduled' },
    { label: 'Posted', status: 'posted' },
  ] as const;

  return (
    <div>
      <h1 className="dash-title">CONTENT PIPELINE</h1>
      <p className="dash-page-desc">
        Manage your content from idea to posted. Move pieces through the pipeline as you
        build, review, schedule, and publish.
      </p>

      <div className="dash-pipeline" role="region" aria-label="Content pipeline board">
        {columns.map((col) => (
          <div key={col.status} className="pipeline-col" role="group" aria-label={`${col.label} column`}>
            <div className="pipeline-header">
              <h2 className="pipeline-label">{col.label}</h2>
              <span className="pipeline-count" aria-label="0 items">0</span>
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
