import { Link } from "react-router-dom";

function Home() {
  const items = [
  "AC Board",
  "APS",
  "Audio Boards",
  "Blenders",
  "Car Boards",
  "Coffee Machines",
  "Dryer Board",
  "Electric Cookers",
  "Electric Heater",
  "Electric Iron",
  "Electric Shower Heater",
  "Eppy Lady",
  "Gaz Cookers",
  "Gaz Heater",
  "Hair Dryers",
  "Hand Mixer",
  "Handy Phone",
  "Industrial Board",
  "Inverter",
  "Juicer",
  "Kettle",
  "Meat Mincer",
  "Microwave",
  "Radio Board",
  "Sewing Machines",
  "Steamer",
  "Stabilizer",
  "TV Board",
  "UPS",
  "Vacuum Cleaners",
  "Ventilator",
  "Voltage Regulator",
  "Washing Board",
  "Wired Phone",
  "Wood Shower Heater"
];

  // Map item names to image paths in public/images
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
  "Hair Dryers": "/images/hair-dryer.png",
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
