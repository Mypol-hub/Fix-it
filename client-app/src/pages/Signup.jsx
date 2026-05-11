import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./login.css"; // Reuse your login styles

function Signup() {
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
          <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required />
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
