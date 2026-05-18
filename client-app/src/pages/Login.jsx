import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkingSession, setCheckingSession] = useState(true);
  
  // Extract item selection if clicked from Home page gallery cards
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        handleNavigation();
      } else {
        setCheckingSession(false);
      }
    };
    checkUser();
  }, []);
  
  const handleNavigation = () => {
    const itemParam = selectedItem ? `?item=${encodeURIComponent(selectedItem)}` : "";
    navigate(`../dashboard${itemParam}`, { replace: true });
  };

  async function handleLogin(e) {
    e.preventDefault();
    
    // 1. Clean and normalize the phone input to match signup configurations
    let rawPhone = e.target.phone.value.trim().replace(/\D/g, "");
    if (rawPhone.startsWith("0")) {
      rawPhone = "961" + rawPhone.substring(1);
    }

    const password = e.target.password.value;

    // 2. Generate the same precise hidden email string structure
    const virtualEmail = `${rawPhone}@fixit.com`;

    // 3. Login through the email provider block
    const { error } = await supabase.auth.signInWithPassword({ 
      email: virtualEmail, 
      password: password 
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      handleNavigation();
    }
  }

  if (checkingSession) {
    return (
      <div className="loading-screen">
        <p>Verifying secure connection...</p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Client Login</h2>
        {selectedItem && (
          <p className="login-item">Logging in to repair: <span>{selectedItem}</span></p>
        )}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="03692588" 
              required 
            />
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
