function ErrorState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
          ⚠️
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Something went wrong
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          We couldn't retrieve the scheme information right now. Please try
          again in a moment.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-7 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
