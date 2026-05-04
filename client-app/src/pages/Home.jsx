import { Link } from "react-router-dom";

function Home() {
  const items = [
    "Gaz Heater", "Electric Heater", "Wood Shower Heater", "Electric Shower Heater",
    "Electric Iron", "Vapor Items", "Cordless Handy Phone", "Wired Phone",
    "Blenders", "Juicer", "Hand Mixer", "Electric Ventilator",
    "Seb Meat Mincer", "Seb Kettles", "Seb Electric Cookers", "Seb Gaz Cookers",
    "Hair Dryers", "Eppy Lady", "Coffee Machines", "Sewing Machines",
    "Car Boards", "Washing Machine Board", "Cloth Dryer Machine Board",
    "AC Board", "Industrial Machine Board", "TV Board", "Radio Board",
    "Audio Machines", "UPS", "APS", "Inverter", "Stabilizer",
    "Voltage Regulator", "Microwave", "Electric Oven", "Vacuum Cleaners"
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
    "air-conditioning": "/images/air-conditioning.jpg",
    "aps": "/images/aps.png",
    "carboard": "/images/carboard.jpg",
    "coffee": "/images/coffee.jpg",
    "eheater": "/images/eheater.jpg",
    "eoven": "/images/eoven.jpg",
    "epylady": "/images/epylady.png",
    "gaz-oven": "/images/gaz-oven.png",
    "hairdryer": "/images/hairdryer.png",
    "handy": "/images/handy.jpg",
    "industrial-machine": "/images/industrial-machine.png",
    "inverter"": "/images/inverter.jpg",
    "kettle": "/images/kettle.jpeg",
    "meatmincer": "/images/meatmincer.jpeg",
    "microwave": "/images/microwave.jpg",
    "mixer": "/images/mixer.jpg",
    "phone": "/images/phone.jpg",
    "sewing": "/images/sewing.jpg",
    "steamer": "/images/steamer.png",
    "tv": "/images/tv.jpg"
    "ups": "/images/ups.jpg",
    "ventilator": "ventilator.jpg",
    "voltage-regulator": "/images/voltage-regulator.jpg",
    "voltage-stabilizer": "/images/voltage-stabilizer.jpg",
    "washing-machine": "/images/washing-machine.jpg",
    
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
