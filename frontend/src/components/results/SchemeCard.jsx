import React, { useState } from "react";
import DocumentChecklist from "./DocumentChecklist";

function SchemeCard({ scheme }) {
  const [showDocuments, setShowDocuments] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        {/* Scheme Name */}
        <h2 className="text-2xl font-bold text-blue-700">{scheme.name}</h2>

        {/* Description */}
        <p className="text-gray-600 mt-3">{scheme.description}</p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => setShowDocuments(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            📄 View Documents
          </button>

          <button
            onClick={() => window.open(scheme.portal, "_blank")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            🌐 Official Portal
          </button>
        </div>
      </div>

      {showDocuments && (
        <DocumentChecklist
          documents={scheme.documents}
          onClose={() => setShowDocuments(false)}
        />
      )}
    </>
  );
}

export default SchemeCard;
