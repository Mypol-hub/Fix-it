import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item"); // e.g. "Washing Board"

  async function handleLogin(e) {
    e.preventDefault();
    // TODO: add real authentication here
    // On success:
    navigate(`/dashboard?item=${encodeURIComponent(selectedItem)}`);
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#003366",
            }}
          >
            Client Login
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            Please log in to provide professional feedback on your repair request.
          </p>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label style={{ marginBottom: "5px", fontSize: "14px" }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            />

            <label style={{ marginBottom: "5px", fontSize: "14px" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            />

            <label style={{ marginBottom: "5px", fontSize: "14px" }}>Feedback</label>
            <textarea
              name="feedback"
              placeholder="Describe your repair issue or feedback"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "80px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Login & Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
