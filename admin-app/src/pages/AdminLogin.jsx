// admin-app/src/pages/AdminLogin.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Clean the input phone format
    let formattedPhone = phone.trim().replace(/\D/g, "");

    // 2. Map your local admin number explicitly to your master email profile
    if (formattedPhone === "03660068" || formattedPhone.includes("3660068")) {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: "khalil_repair@gmail.com", // Maps directly to your valid Supabase profile
        password: password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
      } else if (data?.session) {
        setLoading(false);
        window.location.reload(); // Updates session state for App.jsx
      }
    } else {
      setError("Unauthorized access profile configuration.");
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input 
          type="tel" 
          placeholder="Enter Admin Phone" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Access Dashboard"}
        </button>
        {error && <p className="err">{error}</p>}
      </form>
    </div>
  );
}
