import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import Feedback from "./pages/Feedback";

// ✅ Intelligent ProtectedRoute
const ProtectedRoute = ({ session, loading, children }) => {
  if (loading) return <div className="loading-screen">Loading Khalil Electronics...</div>;
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for any auth changes (Login, Logout, Session Expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Navbar session={session} />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Action Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/request" 
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Request />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/feedback" 
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Feedback />
            </ProtectedRoute>
          } 
        />

        {/* Fallback - Redirect unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
