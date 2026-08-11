function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl text-white shadow-xl shadow-blue-500/20">
          ✨
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Finding Eligible Schemes...
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we search government schemes for you.
        </p>
      </div>
    </div>
  );
}

export default Loader;
