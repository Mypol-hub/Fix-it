import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Repair Portal</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
