import { useState } from "react";

import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import SchemeCard from "../components/results/SchemeCard";
import { dummySchemes } from "../data/schemes";

function Results() {
  const [schemes] = useState(dummySchemes);
  const [loading] = useState(false);
  const [error] = useState(false);

  // 🌙 Theme state
  const [darkMode, setDarkMode] = useState(false);

  const totalDocuments = schemes.reduce(
    (total, scheme) => total + (scheme.documents?.length || 0),
    0,
  );

  const categories = new Set(
    schemes.map((scheme) => {
      const name = scheme.name?.toLowerCase() || "";

      if (
        name.includes("scholar") ||
        name.includes("education") ||
        name.includes("merit")
      ) {
        return "Education";
      }

      if (name.includes("ayushman") || name.includes("health")) {
        return "Healthcare";
      }

      if (name.includes("kisan")) {
        return "Agriculture";
      }

      if (name.includes("awas") || name.includes("housing")) {
        return "Housing";
      }

      if (name.includes("svanidhi") || name.includes("vendor")) {
        return "Livelihood";
      }

      return "Other";
    }),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (schemes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-500 ${
          darkMode
            ? "border-slate-800 bg-slate-950/90"
            : "border-slate-200/70 bg-white/85"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white shadow-lg shadow-blue-500/20">
              Y
            </div>

            <div>
              <h1
                className={`text-xl font-bold tracking-tight transition-colors ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Yojna<span className="text-blue-500">Fy</span>
              </h1>

              <p
                className={`hidden text-[10px] font-semibold tracking-[0.18em] sm:block ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                SMART SCHEME NAVIGATOR
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* Results Ready */}
            <div
              className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors sm:flex ${
                darkMode
                  ? "border-emerald-800 bg-emerald-950/60 text-emerald-400"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Results Ready
            </div>

            {/* 🌙 THEME TOGGLE */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              className={`group relative flex h-11 w-20 items-center rounded-full border p-1 transition-all duration-300 ${
                darkMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-100"
              }`}
            >
              {/* Sliding circle */}
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all duration-300 ${
                  darkMode
                    ? "translate-x-9 bg-slate-700"
                    : "translate-x-0 bg-white"
                }`}
              >
                <span className="text-lg">{darkMode ? "🌙" : "☀️"}</span>
              </div>

              {/* Small labels */}
              <span
                className={`absolute text-[10px] font-bold transition-opacity ${
                  darkMode
                    ? "left-2 opacity-0"
                    : "right-2 opacity-100 text-slate-500"
                }`}
              >
                ☀
              </span>

              <span
                className={`absolute left-2 text-[10px] font-bold transition-opacity ${
                  darkMode ? "opacity-100 text-slate-400" : "opacity-0"
                }`}
              >
                🌙
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 px-6 py-10 text-white shadow-2xl shadow-blue-600/15 sm:px-10 lg:px-12 lg:py-12">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              ✨ Personalized Results
            </div>

            {/* Heading */}
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Your eligible schemes are here.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Based on the information you provided, we've found government
              schemes that may be relevant to your profile.
            </p>

            {/* STATS */}
            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-3xl font-bold">{schemes.length}</p>

                <p className="mt-1 text-xs text-blue-100">Schemes found</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-3xl font-bold">{categories.size}</p>

                <p className="mt-1 text-xs text-blue-100">Categories</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-3xl font-bold">{totalDocuments}</p>

                <p className="mt-1 text-xs text-blue-100">Documents listed</p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <section className="mb-7 mt-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
                Recommended for you
              </p>

              <h3
                className={`mt-1 text-2xl font-bold transition-colors sm:text-3xl ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Explore available schemes
              </h3>
            </div>

            {/* Results count */}
            <div
              className={`hidden rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1 sm:block ${
                darkMode
                  ? "bg-slate-900 text-slate-300 ring-slate-700"
                  : "bg-white text-slate-500 ring-slate-200"
              }`}
            >
              {schemes.length} results
            </div>
          </div>
        </section>

        {/* =====================================================
            SCHEME CARDS
        ====================================================== */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </section>

        {/* =====================================================
            BOTTOM NOTE
        ====================================================== */}
        <div
          className={`mt-12 rounded-2xl border p-5 text-center shadow-sm transition-colors ${
            darkMode
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`flex items-center justify-center gap-2 text-sm font-medium ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <span>🇮🇳</span>
            Always verify eligibility and application details on the official
            government portal.
          </div>
        </div>
      </main>
    </div>
  );
}

export default Results;
