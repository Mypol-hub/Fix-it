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

  return (
    <div>
      <header>
        <h1>Khaleel Electronics Repair Shop</h1>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {items.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
            <div style={{ width: "150px", height: "150px", backgroundColor: "#eee", margin: "0 auto" }}>
              {/* Placeholder for image */}
              <p style={{ paddingTop: "60px" }}>Image</p>
            </div>
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
