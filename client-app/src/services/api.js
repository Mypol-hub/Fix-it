// Example API calls to Netlify Functions
export async function submitRequest(data) {
  const res = await fetch("/.netlify/functions/submitRequest", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getRepairStatus(id) {
  const res = await fetch(`/.netlify/functions/updateStatus?id=${id}`);
  return res.json();
}
