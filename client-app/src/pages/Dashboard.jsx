import RequestForm from "./RequestForm";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Your Dashboard</h2>
      <p className="text-center text-gray-600 mb-6">
        Submit a new repair request or provide feedback below.
      </p>

      {/* Request Form inside Dashboard */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <RequestForm />
      </div>
    </div>
  );
}

export default Dashboard;
