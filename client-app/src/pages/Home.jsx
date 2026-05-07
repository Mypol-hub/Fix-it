import { Link } from "react-router-dom";
import "./Home.css";   // ✅ Import your CSS file

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
    <main className="home-grid">
      {items.map((item, index) => (
        <div key={index} className="home-card">
          <img
            src={images[item] || "https://via.placeholder.com/150?text=No+Image"}
            alt={item}
            className="home-image"
          />
          <h3 className="home-title">{item}</h3>
          <Link to={`/login?item=${encodeURIComponent(item)}`}>
            <button className="button">Repair</button>
          </Link>
        </div>
      ))}
    </main>
  );
}

export default Home;
