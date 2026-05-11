import { Routes, Route } from "react-router-dom"; // No Router import needed here if it's in main.jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<Request />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
