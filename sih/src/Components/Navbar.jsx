function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          D
        </div>

        <div className="navbar-title">
          Digital Citizen Assistant
        </div>
      </div>

      <select className="language-selector" defaultValue="en">
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </header>
  );
}

export default Navbar;