import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <>
      {/* Navbar always visible */}
      <Navbar />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<Request />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </>
  );
}

export default App;
