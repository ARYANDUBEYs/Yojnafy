import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <h1>{t.appName}</h1>

      <LanguageSelector />
    </nav>
  );
}

export default Navbar;