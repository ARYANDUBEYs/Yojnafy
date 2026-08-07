function ErrorState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold text-red-600">
          ⚠ Something Went Wrong
        </h2>

        <p className="mt-4 text-gray-500">
          Please try again after a few moments.
        </p>

        <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg">
          Retry
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
