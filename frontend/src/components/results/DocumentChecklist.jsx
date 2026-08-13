import React from "react";
import PDFButton from "./PDFButton";

function DocumentChecklist({ documents = [], schemeName = "", onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/20 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl text-white shadow-lg shadow-blue-500/20">
                📄
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Required Documents
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep these documents ready before applying.
                </p>
              </div>
            </div>
            {/* Close */}
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-slate-400 transition hover:bg-white hover:text-slate-700"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Documents */}
        <div className="px-6 py-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              Document checklist
            </p>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
              {documents.length} items
            </span>
          </div>

          <div className="space-y-3">
            {documents.map((document, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/50"
              >
                {/* Number */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-blue-600 shadow-sm ring-1 ring-slate-100">
                  {index + 1}
                </div>
                {/* Document */}
                <span className="flex-1 text-sm font-medium text-slate-700">
                  {document}
                </span>
                {/* Check */}
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                  ✓
                </div>
              </div>
            ))}
          </div>

          {/* PDF */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-xl">📥</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Save your checklist
                </p>
                <p className="text-xs text-slate-500">
                  Download these requirements for later.
                </p>
              </div>
            </div>
            <PDFButton documents={documents} schemeName={schemeName} />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentChecklist;