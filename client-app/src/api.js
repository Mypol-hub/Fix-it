import { supabase } from "./supabaseClient";

/**
 * Helper function to get current user ID
 */
async function getUserId() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id; // Returns the UUID of the logged-in user
}

export async function submitRequest(customerName, email, itemName, problemDescription) {
  const userId = await getUserId();
  
  const { data, error } = await supabase
    .from("requests")
    .insert([{ 
      user_id: userId, // Added this line
      customer_name: customerName, 
      email, 
      item_name: itemName, 
      problem_description: problemDescription 
    }]);

  if (error) console.error("Request Error:", error.message);
  return data;
}

export async function submitFeedback(email, feedback) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("feedbacks")
    .insert([{ 
      user_id: userId, // Added this line
      email, 
      feedback 
    }]);

  if (error) console.error("Feedback Error:", error.message);
  return data;
}

export async function uploadItem(itemName, imageUrl) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("items")
    .insert([{ 
      user_id: userId, // Added this line
      item_name: itemName, 
      image_url: imageUrl 
    }]);

  if (error) console.error("Upload Error:", error.message);
  return data;
}
