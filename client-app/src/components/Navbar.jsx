import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    // Clear saved email from localStorage
    localStorage.removeItem("clientEmail");
    // Redirect to login page
    navigate("/login");
  }

  return (
    <nav
      style={{
        backgroundColor: "#003366",
        color: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "18px" }}>Khalil Electronics</h1>
      <div>
        <Link
          to="/"
          style={{ marginRight: "10px", color: "white", textDecoration: "none" }}
        >
          Home
        </Link>
        <Link
          to="/login"
          style={{ marginRight: "10px", color: "white", textDecoration: "none" }}
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          style={{ marginRight: "10px", color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#cc0000",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
