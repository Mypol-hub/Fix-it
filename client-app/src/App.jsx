import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequestForm from "./components/RequestForm";

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;
