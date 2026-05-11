import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  // 1. Capture the intent from the URL
  const selectedItem = params.get("item");
  const redirectTarget = params.get("redirect"); // e.g., "request"

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        handleNavigation();
      }
    };
    checkUser();
  }, [navigate]);

  // 2. Logic to send user to the right place after login
  const handleNavigation = () => {
    const itemParam = selectedItem ? `?item=${encodeURIComponent(selectedItem)}` : "";
    
    if (redirectTarget === "request") {
      // Send them straight to the request page they wanted
      navigate(`/request${itemParam}`);
    } else {
      // Otherwise, send them to the main Dashboard
      navigate(`/dashboard${itemParam}`);
    }
  };

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      handleNavigation();
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Client Login</h2>

        {selectedItem && (
          <p className="login-item">
            Logging in to repair: <span>{selectedItem}</span>
          </p>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="email@example.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" required />
          </div>

          <div className="login-buttons">
            <button type="submit" className="button login">Login</button>
            <button type="button" className="button clear" onClick={() => navigate('/signup')}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
