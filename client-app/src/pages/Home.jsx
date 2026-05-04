import { Link } from "react-router-dom";

function Home() {
  const items = [
    "Gaz Heater", "Electric Heater", "Wood Shower Heater", "Electric Shower Heater",
    "Electric Iron", "Steamer", "Handy Phone", "Wired Phone",
    "Blenders", "Juicer", "Hand Mixer", "Ventilator",
    "Meat Mincer", "Kettle", "Electric Cookers", "Gaz Cookers",
    "Hair Dryers", "Eppy Lady", "Coffee Machines", "Sewing Machines",
    "Car Boards", "Washing Board", "Dryer Board",
    "AC Board", "Industrial Board", "TV Board", "Radio Board",
    "Audio Boards", "UPS", "APS", "Inverter", "Stabilizer",
    "Voltage Regulator", "Microwave", "Vacuum Cleaners"
  ];

  // Map item names to image paths in public/images
  const images = {
    "Gaz Heater": "/images/gaz-heater.jpg",
    "Electric Heater": "/images/electric-heater.png",
    "Wood Shower Heater": "/images/wood-shower-heater.jpg",
    "Electric Shower Heater": "/images/electric-shower-heater.jpg",
    "Electric Iron": "/images/electric-iron.png",
    "Blenders": "/images/blender.png",
    "Juicer": "/images/juicer.png",
    "Vacuum Cleaners": "/images/vacuum-cleaner.jpg",
    "ac-board": "/images/ac-board.jpg",
    "aps": "/images/aps.png",
    "car-board": "/images/car-board.jpg",
    "coffee": "/images/coffee.jpg",
    "eheater": "/images/eheater.jpg",
    "e-cooker": "/images/e-cooker.jpg",
    "eppy-lady": "/images/eppy-lady.png",
    "gaz-cooker": "/images/gaz-cooker.jpg",
    "hair-dryer": "/images/hair-dryer.png",
    "handy-phone": "/images/handy-phone.jpg",
    "industrial-board": "/images/industrial-board.png",
    "inverter"": "/images/inverter.jpg",
    "kettle": "/images/kettle.jpeg",
    "meat-mincer": "/images/meat-mincer.jpeg",
    "microwave": "/images/microwave.jpg",
    "hand-mixer": "/images/hand-mixer.jpg",
    "wired-phone": "/images/wired-phone.jpg",
    "sewing": "/images/sewing.jpg",
    "steamer": "/images/steamer.png",
    "tv": "/images/tv.jpg"
    "ups": "/images/ups.jpg",
    "ventilator": "ventilator.jpg",
    "voltage-regulator": "/images/voltage-regulator.jpg",
    "voltage-stabilizer": "/images/voltage-stabilizer.jpg",
    "washing-board": "/images/washing-board.jpg",
    "dryer-board": "/images/dryer-board",
    "radio": "/images/radio.png",
    "audio-board": "/images/audio-board",
    
    // …continue mapping for all items you have photos for
  };

  return (
    <div>
      <header>
        <h1>Khaleel Electronics Repair Shop</h1>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {items.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
            <img
              src={images[item] || "https://via.placeholder.com/150?text=No+Image"}
              alt={item}
              width="150"
              height="150"
              style={{ display: "block", margin: "0 auto" }}
            />
            <h3>{item}</h3>
            <Link to="/login">
              <button>Repair</button>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
