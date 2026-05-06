import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item"); // e.g. "AC Board"

  // ✅ Auto‑redirect if email already saved
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

    // Save email locally
    localStorage.setItem("clientEmail", email);

    // Redirect with item param + email
    navigate(
      `/dashboard?item=${encodeURIComponent(selectedItem || "")}&email=${encodeURIComponent(email)}`
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-2">
          Client Login
        </h2>

        {/* ✅ Show selected item */}
        {selectedItem && (
          <p className="text-center text-gray-700 mb-4">
            You are logging in for: <span className="font-semibold">{selectedItem}</span>
          </p>
        )}

        <p className="text-center text-gray-500 mb-6 text-sm">
          Please log in to provide professional feedback on your repair request.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              name="feedback"
              placeholder="Describe your repair issue or feedback"
              required
              rows="3"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login & Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
