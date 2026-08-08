import LanguageSelector from "./LanguageSelector";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Digital Citizen Assistant</h1>

      <LanguageSelector />
    </nav>
  );
}

export default Navbar;