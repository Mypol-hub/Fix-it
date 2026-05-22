import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Navbar.css";

export default function Navbar({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (err) {
      console.error("Logout execution error:", err);
    }
  };

  return (
    <nav className="navbar">
      {/* 🌟 MATCHES YOUR BRAND GROUPING CSS */}
      <div className="navbar-brand-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="navbar-title">Khalil Electronics Repair</h1>
        </Link>
        
        {/* 📍 MATCHES YOUR META-INFO ELEMENT RULES */}
        <div className="navbar-shop-info">
          <p>📍 Presidence Street-Sarba</p>
          <span className="navbar-info-divider">|</span>
          <p>
            📞 <a href="tel:+96103660068">03660068</a>
            </p>
            <p>
            📞 <a href="tel:+96109215171">09215171</a>
          </p>
        </div>
      </div>
      
      {/* 💎 MATCHES YOUR LINKS WRAPPER CSS */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        
        {session ? (
          <>
            <Link to="dashboard" className="nav-link">Dashboard</Link>
            <button onClick={handleLogout} className="logout-button">
              Sign Out
            </button>
          </>
        ) : (
          <Link to="login" className="nav-link login-cta">Login</Link>
        )}
      </div>
    </nav>
  );
}
