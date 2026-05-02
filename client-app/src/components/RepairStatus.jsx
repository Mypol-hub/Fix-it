import { useState } from "react";
import { getRepairStatus } from "../api/api";

function RepairStatus() {
  const [status, setStatus] = useState(null);

  const checkStatus = async () => {
    const res = await getRepairStatus("123"); // Example ID
    setStatus(res.status);
  };

  return (
    <div>
      <h3>Repair Status</h3>
      <button onClick={checkStatus}>Check Status</button>
      {status && <p>Status: {status}</p>}
    </div>
  );
}
export default RepairStatus;
