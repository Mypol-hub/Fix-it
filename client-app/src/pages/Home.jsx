import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./Home.css";

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

  const images = {
    "AC Board": "images/ac-board.jpg",
    "APS": "images/aps.png",
    "Audio Boards": "images/audio-board.jpg",
    "Blenders": "images/blender.png",
    "Car Boards": "images/car-board.jpg",
    "Coffee Machines": "images/coffee.jpg",
    "Dryer Board": "images/dryer-board.jpg",
    "Electric Cookers": "images/e-cooker.jpg",
    "Electric Heater": "images/electric-heater.png",
    "Electric Iron": "images/electric-iron.png",
    "Electric Shower Heater": "images/electric-shower-heater.jpg",
    "Eppy Lady": "images/eppy-lady.png",
    "Gaz Cookers": "images/gaz-cooker.jpg",
    "Gaz Heater": "images/gaz-heater.jpg",
    "Hair Dryers": "images/hair-dryer.jpg",
    "Hand Mixer": "images/hand-mixer.jpg",
    "Handy Phone": "images/handy-phone.jpg",
    "Industrial Board": "images/industrial-board.png",
    "Inverter": "images/inverter.jpg",
    "Juicer": "images/juicer.png",
    "Kettle": "images/kettle.jpeg",
    "Meat Mincer": "images/meat-mincer.jpeg",
    "Microwave": "images/microwave.jpg",
    "Radio Board": "images/radio.png",
    "Sewing Machines": "images/sewing.jpg",
    "Steamer": "images/steamer.png",
    "Stabilizer": "images/voltage-stabilizer.jpg",
    "TV Board": "images/tv.jpg",
    "UPS": "images/ups.jpg",
    "Vacuum Cleaners": "images/vacuum-cleaner.jpg",
    "Ventilator": "images/ventilator.jpg",
    "Voltage Regulator": "images/voltage-regulator.jpg",
    "Washing Board": "images/washing-board.jpg",
    "Wired Phone": "images/wired-phone.jpg",
    "Wood Shower Heater": "images/wood-shower-heater.jpg"
  };
  
  const handleRepairClick = (item) => {
    if (session) {
      // ✅ REMOVED leading slash to keep it relative to the HashRouter current folder structure
      navigate(`dashboard?item=${encodeURIComponent(item)}`);
    } else {
      navigate(`login?item=${encodeURIComponent(item)}`);
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
            onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Missing+File"; }}
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
