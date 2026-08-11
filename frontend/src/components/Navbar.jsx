import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { t } = useLanguage();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        darkMode
          ? "border-slate-800 bg-slate-950/90"
          : "border-slate-200/70 bg-white/90"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo / Brand */}
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
              {t.appName || "YojnaFy"}
            </h1>

            <p
              className={`hidden text-[10px] font-semibold tracking-[0.18em] transition-colors sm:block ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              SMART SCHEME NAVIGATOR
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* AI status */}
          <div
            className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors sm:flex ${
              darkMode
                ? "border-slate-700 bg-slate-900 text-slate-300"
                : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
            AI Assistant
          </div>

          {/* 🌙 Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
              darkMode
                ? "border-slate-700 bg-slate-900 text-yellow-300 hover:border-slate-600 hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <span className="text-lg transition-transform duration-300 hover:rotate-12">
              {darkMode ? "☀️" : "🌙"}
            </span>
          </button>

          {/* Language */}
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
//donee navbar