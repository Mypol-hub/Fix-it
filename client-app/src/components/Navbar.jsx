import { Link } from "react-router-dom";
import "./Navbar.css";   // ✅ Import CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo / Title */}
      <h1>Khalil Electronics</h1>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}
