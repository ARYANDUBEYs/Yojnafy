import React, { useState } from "react";
import DocumentChecklist from "./DocumentChecklist";
import { useTheme } from "../../context/ThemeContext";

function getCategory(name = "") {
  const value = name.toLowerCase();

  if (
    value.includes("scholar") ||
    value.includes("education") ||
    value.includes("merit")
  ) {
    return {
      label: "Education",
      icon: "🎓",
      color: "blue",
    };
  }

  if (value.includes("ayushman") || value.includes("health")) {
    return {
      label: "Healthcare",
      icon: "🏥",
      color: "rose",
    };
  }

  if (value.includes("kisan")) {
    return {
      label: "Agriculture",
      icon: "🌾",
      color: "emerald",
    };
  }

  if (value.includes("awas") || value.includes("housing")) {
    return {
      label: "Housing",
      icon: "🏠",
      color: "amber",
    };
  }

  if (value.includes("svanidhi") || value.includes("vendor")) {
    return {
      label: "Livelihood",
      icon: "💼",
      color: "violet",
    };
  }

  return {
    label: "Government Benefit",
    icon: "🇮🇳",
    color: "indigo",
  };
}

function SchemeCard({ scheme }) {
  const [showDocuments, setShowDocuments] = useState(false);
  const { darkMode } = useTheme();

  const category = getCategory(scheme.name);

  // Demo score until backend provides a real match score
  const matchScore = 88 + ((scheme.id * 3) % 10);

  return (
    <>
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-1 ${
          darkMode
            ? "border-slate-800 bg-slate-900 shadow-black/20 hover:border-blue-800 hover:shadow-black/40"
            : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-200/70"
        }`}
      >
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500" />

        <div className="flex flex-1 flex-col p-6">
          {/* Category + Match */}
          <div className="flex items-start justify-between gap-3">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                darkMode
                  ? "bg-slate-800 text-slate-300"
                  : "bg-slate-50 text-slate-600"
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </div>

            <div
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                darkMode
                  ? "border-emerald-900/60 bg-emerald-950/50 text-emerald-400"
                  : "border-emerald-100 bg-emerald-50 text-emerald-700"
              }`}
            >
              {matchScore}% Match
            </div>
          </div>

          {/* Scheme title */}
          <h3
            className={`mt-5 text-xl font-bold leading-snug transition-colors ${
              darkMode
                ? "text-white group-hover:text-blue-400"
                : "text-slate-900 group-hover:text-blue-700"
            }`}
          >
            {scheme.name}
          </h3>

          {/* Description */}
          <p
            className={`mt-3 line-clamp-3 text-sm leading-6 transition-colors ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {scheme.description}
          </p>

          {/* Match indicator */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span
                className={`font-medium ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Eligibility match
              </span>

              <span className="font-bold text-emerald-500">{matchScore}%</span>
            </div>

            <div
              className={`h-2 overflow-hidden rounded-full ${
                darkMode ? "bg-slate-800" : "bg-slate-100"
              }`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                style={{ width: `${matchScore}%` }}
              />
            </div>
          </div>

          {/* Documents */}
          <div
            className={`mt-6 flex items-center gap-2 border-t pt-5 text-sm transition-colors ${
              darkMode
                ? "border-slate-800 text-slate-400"
                : "border-slate-100 text-slate-500"
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                darkMode ? "bg-blue-950/60" : "bg-blue-50"
              }`}
            >
              📄
            </span>

            <span>
              <strong
                className={darkMode ? "text-slate-200" : "text-slate-700"}
              >
                {scheme.documents?.length || 0}
              </strong>{" "}
              documents required
            </span>
          </div>

          {/* Actions */}
          <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
            {/* Documents button */}
            <button
              onClick={() => setShowDocuments(true)}
              className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                darkMode
                  ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-blue-700 hover:bg-blue-950/50 hover:text-blue-400"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              📄 Documents
            </button>

            {/* Apply button */}
            <button
              onClick={() => window.open(scheme.official_url, "_blank")}
              className="rounded-xl bg-slate-900 px-3 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600"
            >
              Apply ↗
            </button>
          </div>
        </div>
      </article>

      {/* Document modal */}
      {showDocuments && (
  <DocumentChecklist
    documents={scheme.documents}
    schemeName={scheme.name}
    onClose={() => setShowDocuments(false)}
  />
)}
    </>
  );
}

export default SchemeCard;
//improved