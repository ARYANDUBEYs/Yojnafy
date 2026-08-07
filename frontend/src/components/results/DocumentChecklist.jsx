function DocumentChecklist({ documents, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">
            📋 Required Documents
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-3"
            >
              <span className="text-green-600 text-lg">✔</span>
              <span>{doc}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
          ⬇ Download PDF
        </button>
      </div>
    </div>
  );
}

export default DocumentChecklist;
