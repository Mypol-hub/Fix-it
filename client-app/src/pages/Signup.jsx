import { useState } from "react"; // Added useState
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(""); // State to track phone input

  async function handleSignup(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    // UPDATED: Added options object with user_metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone: phone, // Saving phone to metadata
          full_name: e.target.fullName.value, // Recommended to grab name too
        },
      },
    });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      alert("Signup successful! Please check your email for a confirmation link.");
      navigate("/login");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup} className="login-form">
          {/* NEW: Full Name Field */}
          <div>
            <label>Full Name</label>
            <input type="text" name="fullName" placeholder="Enter your full name" required />
          </div>

          <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required />
          </div>

          {/* NEW: Phone Number Field */}
          <div>
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="e.g. +961 70 123 456" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
            />
          </div>

          <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="Create a password" required />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Repeat password" required />
          </div>
          <div className="login-buttons">
            <button type="submit" className="button login">Register</button>
            <button type="button" className="button clear" onClick={() => navigate('/login')}>Back to Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
