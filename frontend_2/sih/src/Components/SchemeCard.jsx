function SchemeCard({ scheme, onDocuments }) {
  return (
    <div className="scheme-card">
      <div className="scheme-card-content">
        <h3>{scheme.name}</h3>

        <p>{scheme.description}</p>

        <div className="scheme-card-actions">
          <button
            type="button"
            className="scheme-button secondary"
            onClick={() => onDocuments(scheme)}
          >
            View documents needed
          </button>

          <a
            href={scheme.official_url || "#"}
            target="_blank"
            rel="noreferrer"
            className="scheme-button primary"
          >
            Official portal
          </a>
        </div>
      </div>
    </div>
  );
}

export default SchemeCard;