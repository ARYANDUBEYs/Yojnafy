function EmptyState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold text-gray-700">
          😔 No Matching Schemes
        </h2>

        <p className="mt-4 text-gray-500">
          We couldn't find any government schemes based on your answers.
        </p>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
          Start New Search
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
