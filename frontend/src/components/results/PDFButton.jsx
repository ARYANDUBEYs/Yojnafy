import React from "react";

function PDFButton() {
  const handleDownload = () => {
    alert("PDF download will be connected to the backend soon.");
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
    >
      📥 Download as PDF
    </button>
  );
}

export default PDFButton;
