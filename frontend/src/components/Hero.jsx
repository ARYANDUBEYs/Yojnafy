import { useLanguage } from "../context/LanguageContext";

function Hero({ onStart }) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/10" />

      <div className="pointer-events-none absolute -right-32 top-32 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-500/10" />

      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dark mode grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-[0.04] dark:block"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-24 text-center lg:px-10 lg:pt-32">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur transition-colors duration-300 dark:border-blue-900/60 dark:bg-slate-900/80 dark:text-blue-400">
          <span>✨</span>
          AI-Powered Scheme Discovery
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 transition-colors duration-300 dark:text-white sm:text-6xl lg:text-7xl">
          {t.welcome || "Your benefits are closer than you think."}
        </h1>

        {/* Gradient heading */}
        <h2 className="mt-4 max-w-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
          Discover what you're eligible for.
        </h2>

        {/* Description */}
        <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 transition-colors duration-300 dark:text-slate-400 sm:text-lg">
          Find government schemes that match your profile through a simple
          conversation. No complicated forms. No endless searching.
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group mt-10 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/30"
        >
          Find My Schemes
          <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        {/* Trust points */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500 transition-colors duration-300 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>🇮🇳</span>
            Government Schemes
          </div>

          <div className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />

          <div className="flex items-center gap-2">
            <span>🔒</span>
            Privacy First
          </div>

          <div className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />

          <div className="flex items-center gap-2">
            <span>🌐</span>
            Hindi + English
          </div>
        </div>

        {/* Mini product preview */}
        <div className="mt-16 w-full max-w-4xl rounded-3xl border border-slate-200 bg-white/70 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/30">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
            {/* Assistant header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                ✨
              </div>

              <div>
                <p className="font-semibold text-slate-800 transition-colors dark:text-white">
                  YojnaFy Assistant
                </p>

                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  ● Online
                </p>
              </div>
            </div>

            {/* Bot message */}
            <div className="max-w-md rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-5 py-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800">
              <p className="text-sm leading-6 text-slate-600 transition-colors dark:text-slate-300">
                Namaste! 👋 I'll ask you a few simple questions and find
                government schemes that may be relevant to you.
              </p>
            </div>

            {/* User message */}
            <div className="ml-auto mt-4 max-w-xs rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-sm text-white shadow-sm">
              Sure! Let's find the schemes I'm eligible for.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
