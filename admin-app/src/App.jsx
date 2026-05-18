// admin-app/src/App.jsx
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Ensure this matches your instantiation file location
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial active session status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Continuously listen for authentication state mutations
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading" style={{ padding: "2rem", textAlign: "center" }}>Synchronizing Session...</div>;
  }

  // If no admin is authenticated, restrict view to the Login wall
  if (!session) {
    return <AdminLogin />;
  }

  // If authenticated, serve the full dashboard portal seamlessly
  return <AdminDashboard />;
}

export default App;
