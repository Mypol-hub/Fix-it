function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted! (Connect this to backend later)");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Client Login</h2>
      <p style={{ textAlign: "center" }}>Please log in to provide professional feedback on your repair request.</p>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your email" required style={{ width: "100%", marginBottom: "10px" }} />

        <label>Password</label>
        <input type="password" name="password" placeholder="Enter your password" required style={{ width: "100%", marginBottom: "10px" }} />

        <label>Feedback</label>
        <textarea name="feedback" placeholder="Describe your repair issue or feedback" required style={{ width: "100%", marginBottom: "10px" }} />

        <button type="submit" style={{ width: "100%", padding: "10px" }}>Login & Submit</button>
      </form>
    </div>
  );
}

export default Login;
