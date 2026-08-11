import jsPDF from "jspdf";

function DocumentChecklist({ scheme, onClose }) {
  const documents = scheme?.documents || [
    "Aadhaar Card",
    "Income Certificate",
    "Previous Academic Marksheet",
    "Bank Account Details",
  ];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Documents Required", 20, 20);
    doc.setFontSize(12);
    doc.text(scheme?.name || "", 20, 30);

    documents.forEach((document, index) => {
      doc.text(`${index + 1}. ${document}`, 20, 45 + index * 10);
    });

    doc.save(`${scheme?.name || "documents"}-checklist.pdf`);
  };

  return (
    <div className="modal-overlay">
      <div className="document-modal">

        <div className="document-modal-header">
          <h2>Documents Required</h2>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <p className="document-scheme-name">
          {scheme?.name}
        </p>

        <div className="document-list">
          {documents.map((document, index) => (
            <div
              className="document-item"
              key={index}
            >
              <span className="document-number">
                {index + 1}
              </span>

              <span>{document}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="download-button"
          onClick={handleDownloadPDF}
        >
          ↓ Download as PDF
        </button>

      </div>
    </div>
  );
}

export default DocumentChecklist;