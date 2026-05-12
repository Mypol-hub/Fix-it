import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://grfbratwsbjgfevtymac.supabase.co";
const supabaseKey = "sb_publishable_vO6B1olb8cXsaqJQliKRZQ_2eflMa0o"; // from Supabase dashboard → Project Settings → API
export const supabase = createClient(supabaseUrl, supabaseKey);

export const api = {
  // Fetch all repair requests for the admin table
  async getAllRequests() {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Update the status of a specific repair
  async updateRequestStatus(id, newStatus) {
    const { data, error } = await supabase
      .from('requests')
      .update({ status: newStatus })
      .eq('id', id);
    if (error) throw error;
    return data;
  }
};
