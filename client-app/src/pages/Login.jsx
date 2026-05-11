import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./supabaseClient"; // ✅ Import your supabase client
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item");

  useEffect(() => {
    // ✅ Check if a real Supabase session exists instead of just an email
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate(`/dashboard?item=${encodeURIComponent(selectedItem || "")}`);
      }
    };
    checkUser();
  }, [navigate, selectedItem]);

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // ✅ Actually log in to Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      // ✅ Success! Supabase handles localStorage for you automatically
      navigate(`/dashboard?item=${encodeURIComponent(selectedItem || "")}`);
    }
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
            <button type="button" className="button clear" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
