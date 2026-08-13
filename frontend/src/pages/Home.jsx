import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useTheme } from "../context/ThemeContext";

function Home({ onStart }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar />

      <Hero onStart={onStart} />
    </div>
  );
}

export default Home;
