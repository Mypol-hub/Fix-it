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

// 1. A wrapper to protect pages from logged-out users
const ProtectedRoute = ({ session, children }) => {
  // Use a state to track if we are intentionally logging out
  if (!session) {
    // Check if the current URL is a dashboard-related one
    // If we just logged out, this redirect to login is what we want to prevent
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [session, setSession] = useState(null);

  // 2. Listen for Login/Logout changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {/* Pass session to Navbar so it can show Login or Logout button */}
      <Navbar session={session} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 3. Protect these routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute session={session}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/request" 
          element={
            <ProtectedRoute session={session}>
              <Request />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/feedback" 
          element={
            <ProtectedRoute session={session}>
              <Feedback />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
