import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const fullName = e.target.fullName.value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    // 1. Clean and normalize the phone number
    let cleanPhone = phone.trim().replace(/\D/g, ""); // Strip spaces, dashes, + signs
    
    // Convert local Lebanese format (e.g., 03123456) to full international code (9613123456)
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "961" + cleanPhone.substring(1);
    }

    if (cleanPhone.length < 7) {
      return alert("Please enter a valid phone number.");
    }

    // 2. Map dynamically to a hidden virtual email behind the scenes
    const virtualEmail = `${cleanPhone}@fixit.com`;

    // 3. Register the user using the email provider channel
    const { data, error } = await supabase.auth.signUp({
      email: virtualEmail,
      password: password,
      options: {
        data: {
          full_name: fullName,
          display_phone: cleanPhone // Saves the clean phone inside user_metadata for references
        },
      },
    });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      alert("Account created successfully!");
      navigate("/login");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup} className="login-form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              placeholder="Enter your full name" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="03 692 588 or 70 123 456" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
            />
            <small>Format: Local number or with international country code</small>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create a password" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Repeat password" 
              required 
            />
          </div>

          <div className="login-buttons">
            <button type="submit" className="button login">Register</button>
            <button 
              type="button" 
              className="button clear" 
              onClick={() => navigate('/login')}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
