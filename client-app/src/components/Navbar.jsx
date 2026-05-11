import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Adjust path if needed
import "./Navbar.css";

export default function Navbar({ session }) {
  const navigate = useNavigate();

    const handleLogout = async () => {
    await supabase.auth.signOut();
    // This forces a hard refresh to the home page, 
    // clearing all auth states and ensuring you land on Home.
    window.location.href = "/Fix-it/"; 
  };

  return (
    <nav className="navbar">
      {/* Logo / Title */}
      <h1>Khalil Electronics</h1>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        
        {/* If user is logged in, show Dashboard and Logout. Otherwise, show Login */}
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
