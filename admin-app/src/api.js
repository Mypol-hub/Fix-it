// admin-app/src/api.js
import { createClient } from "@supabase/supabase-js";

// Make sure your client credentials are correctly wired here
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const api = {
  // Named to match what your App.jsx expects to call
  async getAllRequests() {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateRequestStatus(id, newStatus) {
    const { data, error } = await supabase
      .from("requests")
      .update({ status: newStatus.toLowerCase() })
      .eq("id", id);

    if (error) throw error;
    return data;
  },

  async deleteRequest(id) {
    const { data, error } = await supabase
      .from("requests")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return data;
  }
};
