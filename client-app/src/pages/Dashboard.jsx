import RequestForm from "./RequestForm";

function Dashboard() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Dashboard</h2>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Submit a new repair request or provide feedback below.
      </p>

      {/* Request Form inside Dashboard */}
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px" }}>
        <RequestForm />
      </div>
    </div>
  );
}

export default Dashboard;
