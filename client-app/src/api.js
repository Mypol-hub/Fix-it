import { supabase } from "./supabaseClient";

async function getUserId() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error("Authentication required.");
  }
  return user.id;
}

export const api = {
  async submitRequest(customerName, email, itemName, problemDescription) {
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
        }])
        .select(); // Added .select() to get response data

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  },

  async submitFeedback(email, feedbackText) {
    try {
      const userId = await getUserId();
      const { data, error } = await supabase
        .from("feedbacks")
        .insert([{ 
          user_id: userId,
          email, 
          feedback: feedbackText 
        }])
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  },

  async uploadItem(itemName, imageUrl) {
    try {
      const userId = await getUserId();
      const { data, error } = await supabase
        .from("items")
        .insert([{ 
          user_id: userId,
          item_name: itemName, 
          image_url: imageUrl 
        }])
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  }
};
