import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";   // ✅ Import CSS

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item");

  useEffect(() => {
    const savedEmail = localStorage.getItem("clientEmail");
    if (savedEmail) {
      navigate(
        `/dashboard?item=${encodeURIComponent(selectedItem || "")}&email=${encodeURIComponent(savedEmail)}`
      );
    }
  }, [navigate, selectedItem]);

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    localStorage.setItem("clientEmail", email);
    navigate(
      `/dashboard?item=${encodeURIComponent(selectedItem || "")}&email=${encodeURIComponent(email)}`
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Client Login</h2>

        {selectedItem && (
          <p className="login-item">
            You are logging in for: <span>{selectedItem}</span>
          </p>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required />
          </div>

          <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" required />
          </div>

          <div className="login-buttons">
            <button type="submit" className="button login">Login</button>
            <button type="reset" className="button clear">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
