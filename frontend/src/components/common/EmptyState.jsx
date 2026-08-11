function EmptyState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
          🔍
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          No schemes found
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          We couldn't find any schemes matching the information provided. Try
          again with different details.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
