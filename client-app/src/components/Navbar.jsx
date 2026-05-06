import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ Logout clears localStorage and redirects to Login
  function handleLogout() {
    localStorage.removeItem("clientEmail"); 
    navigate("/"); // redirect to login page
  }

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold tracking-wide">Khalil Electronics</h1>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="no-underline hover:text-blue-200 transition">
          Home
        </Link>
        <Link to="/login" className="no-underline hover:text-blue-200 transition">
          Login
        </Link>
        <Link to="/dashboard" className="no-underline hover:text-blue-200 transition">
          Dashboard
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
