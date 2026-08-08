function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h2 className="mt-6 text-2xl font-bold text-blue-700">
          Finding Eligible Schemes...
        </h2>

        <p className="text-gray-500 mt-2">
          Please wait while we search government schemes.
        </p>
      </div>
    </div>
  );
}

export default Loader;
