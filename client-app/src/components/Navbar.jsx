import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold tracking-wide">Khalil Electronics</h1>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="no-underline hover:text-blue-200 transition">
          Home
        </Link>
      </div>
    </nav>
  );
}
