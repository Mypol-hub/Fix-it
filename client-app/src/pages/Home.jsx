import { Link } from "react-router-dom";

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

  return (

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
