export default function RepairStatus({ requests }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Repair Status</h3>
      {(!requests || requests.length === 0) ? (
        <p className="text-gray-500">No repair requests yet.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((req, idx) => (
            <li
              key={idx}
              className="border border-gray-200 rounded-md p-4 bg-gray-50"
            >
              <p className="font-medium text-gray-800">{req.itemName}</p>
              <p className="text-sm text-gray-600">{req.problem}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                  req.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : req.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {req.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
