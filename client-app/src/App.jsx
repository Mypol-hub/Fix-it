import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import RequestForm from "./components/RequestForm";

function App() {
  return (
    <BrowserRouter basename="/Fix-it">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/request" element={<RequestForm />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
