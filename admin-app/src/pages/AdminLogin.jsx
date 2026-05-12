// admin-app/src/pages/AdminLogin.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input 
          type="email" 
          placeholder="Admin Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Access Dashboard</button>
        {error && <p className="err">{error}</p>}
      </form>
    </div>
  );
}
