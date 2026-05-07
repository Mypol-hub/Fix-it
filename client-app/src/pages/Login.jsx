import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item");

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
    localStorage.setItem("clientEmail", email);
    navigate(
      `/dashboard?item=${encodeURIComponent(selectedItem || "")}&email=${encodeURIComponent(email)}`
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-center text-3xl font-bold text-blue-900 mb-6">
          Client Login
        </h2>

        {selectedItem && (
          <p className="text-center text-gray-700 mb-6">
            You are logging in for:{" "}
            <span className="font-semibold text-blue-700">{selectedItem}</span>
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              type="reset"
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
