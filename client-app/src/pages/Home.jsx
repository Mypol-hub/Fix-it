import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./home.css";

function Home() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const items = [
    "AC Board", "APS", "Audio Boards", "Blenders", "Car Boards", "Coffee Machines",
    "Dryer Board", "Electric Cookers", "Electric Heater", "Electric Iron",
    "Electric Shower Heater", "Eppy Lady", "Gaz Cookers", "Gaz Heater", "Hair Dryers",
    "Hand Mixer", "Handy Phone", "Industrial Board", "Inverter", "Juicer", "Kettle",
    "Meat Mincer", "Microwave", "Radio Board", "Sewing Machines", "Steamer",
    "Stabilizer", "TV Board", "UPS", "Vacuum Cleaners", "Ventilator",
    "Voltage Regulator", "Washing Board", "Wired Phone", "Wood Shower Heater"
  ];

  // Mapping remains the same...
  const images = { /* ... your image paths ... */ };

  const handleRepairClick = (item) => {
    if (session) {
      // User is logged in -> Send to request page
      navigate(`/request?item=${encodeURIComponent(item)}`);
    } else {
      // User is logged out -> Send to login with redirect instructions
      navigate(`/login?redirect=request&item=${encodeURIComponent(item)}`);
    }
  };

  return (
    <main className="home-grid">
      {items.map((item, index) => (
        <div key={index} className="home-card">
          <img
            src={images[item] || "https://via.placeholder.com/150?text=No+Image"}
            alt={item}
            className="home-image"
          />
          <h3 className="home-title">{item}</h3>
          <button 
            className="button" 
            onClick={() => handleRepairClick(item)}
          >
            Repair
          </button>
        </div>
      ))}
    </main>
  );
}

export default Home;
