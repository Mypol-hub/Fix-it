import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("clientEmail");
    navigate("/login");
  }

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
  
  <div className="space-x-4">
    <a href="/" className="hover:underline">Home</a>
    <a href="/login" className="hover:underline">Login</a>
    <a href="/dashboard" className="hover:underline">Dashboard</a>
    <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
  </div>
</nav>
  );
}
