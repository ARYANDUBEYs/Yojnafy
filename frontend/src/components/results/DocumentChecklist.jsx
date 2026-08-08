import React from "react";
import PDFButton from "./PDFButton";

function DocumentChecklist({ documents = [], onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-blue-700">
            Required Documents
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Documents */}
        <div className="space-y-3">
          {documents.map((document, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-blue-50 rounded-lg p-3"
            >
              <span className="text-green-600 font-bold">✓</span>

              <span className="text-gray-700">{document}</span>
            </div>
          ))}
        </div>

        {/* PDF */}
        <div className="mt-6">
          <PDFButton />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DocumentChecklist;
