import React from "react";

function PDFButton() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <button
      onClick={handleDownload}
      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/25 active:translate-y-0"
    >
      <span className="text-base transition-transform duration-200 group-hover:-translate-y-0.5">
        📥
      </span>
      Download Document Checklist
    </button>
  );
}

export default PDFButton;
//vv