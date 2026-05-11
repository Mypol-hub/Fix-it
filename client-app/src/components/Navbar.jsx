import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Navbar.css";

export default function Navbar({ session }) {
  const navigate = useNavigate();

  // --- REPLACE YOUR OLD handleLogout WITH THIS ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
    
    // Use the absolute path for your GitHub Pages site
    // This ensures that when the session clears, you are forced to Home
    window.location.href = "/Fix-it/"; 
  };
  // -----------------------------------------------

  return (
    <nav className="navbar">
      <h1>Khalil Electronics</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        
        {session ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
