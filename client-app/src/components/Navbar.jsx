export default function Navbar() {
  return (
    <nav style={{ backgroundColor: "#003366", color: "white", padding: "10px" }}>
      <h1 style={{ fontSize: "18px" }}>@Kangooroo‑Tech</h1>
      <div>
        <a href="/" style={{ marginRight: "10px", color: "white" }}>Home</a>
        <a href="/login" style={{ marginRight: "10px", color: "white" }}>Login</a>
        
      </div>
    </nav>
  );
}
