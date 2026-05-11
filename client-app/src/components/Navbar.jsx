import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Adjust path if needed
import "./Navbar.css";

export default function Navbar({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      // Send them home after logging out
      navigate("/");
    }
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
