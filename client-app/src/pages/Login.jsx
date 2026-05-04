import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect this to backend authentication later
    navigate("/dashboard");
  };

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
          padding: "20px"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h2 style={{ textAlign: "center", fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
            Client Login
          </h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
            Please log in to provide professional feedback on your repair request.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Feedback</label>
              <textarea
                name="feedback"
                placeholder="Describe your repair issue or feedback"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  minHeight: "80px"
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
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
