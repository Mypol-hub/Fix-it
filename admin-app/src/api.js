// admin-app/src/api.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://grfbratwsbjgfevtymac.supabase.co";
const supabaseKey = "sb_publishable_vO6B1olb8cXsaqJQliKRZQ_2eflMa0o"; 

export const supabase = createClient(supabaseUrl, supabaseKey);

export const api = {
  async getAllRequests() {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateRequestStatus(id, newStatus) {
    const { data, error } = await supabase
      .from('requests')
      .update({ status: newStatus })
      .eq('id', id)
      .select(); // 👈 Add this to get the updated row back
    if (error) throw error;
    return data;
  }
};
