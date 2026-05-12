import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

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
