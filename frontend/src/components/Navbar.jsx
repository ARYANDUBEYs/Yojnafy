import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar">

      <div className="navbar-title">
        {t.appName}
      </div>

      <LanguageSelector />

    </nav>
  );
}

export default Navbar;