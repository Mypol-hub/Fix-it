import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("clientEmail");
    navigate("/login");
  }

  return (
    <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold tracking-wide">Khalil Electronics</h1>
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="hover:text-blue-300 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="hover:text-blue-300 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          className="hover:text-blue-300 transition-colors"
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
