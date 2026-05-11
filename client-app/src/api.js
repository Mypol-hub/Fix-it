import { supabase } from "./supabaseClient";

/**
 * Robust helper to get the user ID.
 */
async function getUserId() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("Authentication required: Please log in to continue.");
  }
  
  return user.id;
}

/**
 * Submit a repair request
 */
export async function submitRequest(customerName, email, itemName, problemDescription) {
  try {
    const userId = await getUserId();
    
    const { data, error } = await supabase
      .from("requests")
      .insert([{ 
        user_id: userId,
        customer_name: customerName, 
        email, 
        item_name: itemName, 
        problem_description: problemDescription 
      }]);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Request Error:", err.message);
    return { error: err.message };
  }
}

/**
 * Submit client feedback
 */
export async function submitFeedback(email, feedbackText) {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from("feedback") // Check if this is 'feedback' or 'feedbacks' in Supabase
      .insert([{ 
        user_id: userId,
        email, 
        feedback: feedbackText 
      }]);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Feedback Error:", err.message);
    return { error: err.message };
  }
}

/**
 * Upload an item for repair review
 */
export async function uploadItem(itemName, imageUrl) {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from("items")
      .insert([{ 
        user_id: userId,
        item_name: itemName, 
        image_url: imageUrl 
      }]);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Upload Error:", err.message);
    return { error: err.message };
  }
}
