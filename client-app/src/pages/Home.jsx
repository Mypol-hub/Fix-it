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
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 bg-blue-600 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">Khaleel Electronics Repair Shop</h1>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm p-4 text-center bg-white hover:shadow-md transition"
          >
            <img
              src={images[item] || "https://via.placeholder.com/150?text=No+Image"}
              alt={item}
              className="mx-auto mb-4 h-32 w-32 object-contain"
            />
            <h3 className="text-lg font-semibold mb-2">{item}</h3>
            <Link to="/login">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
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
