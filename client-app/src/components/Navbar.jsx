import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: "#003366", color: "white", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ fontSize: "18px" }}>Khalil Electronics</h1>
      <div>
        <Link
          to="/"
          style={{ marginRight: "10px", color: "white", textDecoration: "none" }}
        >
          Home
        </Link>
        
      </div>
    </nav>
  );
}
