import LanguageSelector from "./LanguageSelector";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Digital Citizen Assistant</h2>

      <LanguageSelector />
    </nav>
  );
}

export default Navbar;