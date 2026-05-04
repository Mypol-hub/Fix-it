import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
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
    "AC Board": "/images/ac-board.jpg",
    "APS": "/images/aps.png",
    "Audio Boards": "/images/audio-board.jpg",
    "Blenders": "/images/blender.png",
    "Car Boards": "/images/car-board.jpg",
    "Coffee Machines": "/images/coffee.jpg",
    "Dryer Board": "/images/dryer-board.jpg",
    "Electric Cookers": "/images/e-cooker.jpg",
    "Electric Heater": "/images/electric-heater.png",
    "Electric Iron": "/images/electric-iron.png",
    "Electric Shower Heater": "/images/electric-shower-heater.jpg",
    "Eppy Lady": "/images/eppy-lady.png",
    "Gaz Cookers": "/images/gaz-cooker.jpg",
    "Gaz Heater": "/images/gaz-heater.jpg",
    "Hair Dryers": "/images/hair-dryer.jpg",
    "Hand Mixer": "/images/hand-mixer.jpg",
    "Handy Phone": "/images/handy-phone.jpg",
    "Industrial Board": "/images/industrial-board.png",
    "Inverter": "/images/inverter.jpg",
    "Juicer": "/images/juicer.png",
    "Kettle": "/images/kettle.jpeg",
    "Meat Mincer": "/images/meat-mincer.jpeg",
    "Microwave": "/images/microwave.jpg",
    "Radio Board": "/images/radio.png",
    "Sewing Machines": "/images/sewing.jpg",
    "Steamer": "/images/steamer.png",
    "Stabilizer": "/images/voltage-stabilizer.jpg",
    "TV Board": "/images/tv.jpg",
    "UPS": "/images/ups.jpg",
    "Vacuum Cleaners": "/images/vacuum-cleaner.jpg",
    "Ventilator": "/images/ventilator.jpg",
    "Voltage Regulator": "/images/voltage-regulator.jpg",
    "Washing Board": "/images/washing-board.jpg",
    "Wired Phone": "/images/wired-phone.jpg",
    "Wood Shower Heater": "/images/wood-shower-heater.jpg"
  };

  return (
    <div>
      <header style={{ padding: "20px", backgroundColor: "#003366", color: "white", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Khaleel Electronics Repair Shop</h1>
      </header>

      <main style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        padding: "20px"
      }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={images[item] || "https://via.placeholder.com/150?text=No+Image"}
              alt={item}
              style={{ width: "150px", height: "150px", objectFit: "contain", marginBottom: "10px" }}
            />
            <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>{item}</h3>
            <Link to={`/login?item=${encodeURIComponent(item)}`}>
              <button style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}>
                Repair
              </button>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
