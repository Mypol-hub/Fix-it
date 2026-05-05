import { supabase } from "./supabaseClient";

export async function submitRequest(customerName, email, itemName, problemDescription) {
  const { data, error } = await supabase
    .from("requests")
    .insert([{ customer_name: customerName, email, item_name: itemName, problem_description: problemDescription }]);
  if (error) console.error(error);
  return data;
}

export async function submitFeedback(email, feedback) {
  const { data, error } = await supabase
    .from("feedbacks")
    .insert([{ email, feedback }]);
  if (error) console.error(error);
  return data;
}

export async function uploadItem(itemName, imageUrl) {
  const { data, error } = await supabase
    .from("items")
    .insert([{ item_name: itemName, image_url: imageUrl }]);
  if (error) console.error(error);
  return data;
}
