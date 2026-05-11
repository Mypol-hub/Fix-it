import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure this path is correct
import "./home.css";

function Home() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // 1. Check if user is logged in
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
    "AC Board": "/Fix-it/images/ac-board.jpg",
    "APS": "/Fix-it/images/aps.png",
    "Audio Boards": "/Fix-it/images/audio-board.jpg",
    "Blenders": "/Fix-it/images/blender.png",
    "Car Boards": "/Fix-it/images/car-board.jpg",
    "Coffee Machines": "/Fix-it/images/coffee.jpg",
    "Dryer Board": "/Fix-it/images/dryer-board.jpg",
    "Electric Cookers": "/Fix-it/images/e-cooker.jpg",
    "Electric Heater": "/Fix-it/images/electric-heater.png",
    "Electric Iron": "/Fix-it/images/electric-iron.png",
    "Electric Shower Heater": "/Fix-it/images/electric-shower-heater.jpg",
    "Eppy Lady": "/Fix-it/images/eppy-lady.png",
    "Gaz Cookers": "/Fix-it/images/gaz-cooker.jpg",
    "Gaz Heater": "/Fix-it/images/gaz-heater.jpg",
    "Hair Dryers": "/Fix-it/images/hair-dryer.jpg",
    "Hand Mixer": "/Fix-it/images/hand-mixer.jpg",
    "Handy Phone": "/Fix-it/images/handy-phone.jpg",
    "Industrial Board": "/Fix-it/images/industrial-board.png",
    "Inverter": "/Fix-it/images/inverter.jpg",
    "Juicer": "/Fix-it/images/juicer.png",
    "Kettle": "/Fix-it/images/kettle.jpeg",
    "Meat Mincer": "/Fix-it/images/meat-mincer.jpeg",
    "Microwave": "/Fix-it/images/microwave.jpg",
    "Radio Board": "/Fix-it/images/radio.png",
    "Sewing Machines": "/Fix-it/images/sewing.jpg",
    "Steamer": "/Fix-it/images/steamer.png",
    "Stabilizer": "/Fix-it/images/voltage-stabilizer.jpg",
    "TV Board": "/Fix-it/images/tv.jpg",
    "UPS": "/Fix-it/images/ups.jpg",
    "Vacuum Cleaners": "/Fix-it/images/vacuum-cleaner.jpg",
    "Ventilator": "/Fix-it/images/ventilator.jpg",
    "Voltage Regulator": "/Fix-it/images/voltage-regulator.jpg",
    "Washing Board": "/Fix-it/images/washing-board.jpg",
    "Wired Phone": "/Fix-it/images/wired-phone.jpg",
    "Wood Shower Heater": "/Fix-it/images/wood-shower-heater.jpg"
  };

  // 2. Handle the smart redirect
  const handleRepairClick = (item) => {
    if (session) {
      // If logged in, go straight to request form
      navigate(`/request?item=${encodeURIComponent(item)}`);
    } else {
      // If logged out, go to login first
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
          {/* Changed from Link to a button click handler */}
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
