import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase credentials
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'your-anon-public-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const api = {
  /**
   * Fetches all repair requests for the dashboard
   */
  async getAllRequests() {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  /**
   * Updates the status of a specific repair (e.g., 'Pending' to 'Repairing')
   */
  async updateRequestStatus(id, newStatus) {
    const { data, error } = await supabase
      .from('requests')
      .update({ status: newStatus })
      .eq('id', id)
      .select(); // returns the updated row

    if (error) throw error;
    return data;
  },

  /**
   * Fetches messages from a specific customer
   */
  async getMessages(userId) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Sends a reply back to the customer
   */
  async sendAdminReply(userId, content) {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ 
        user_id: userId, 
        content: content, 
        is_from_admin: true 
      }]);

    if (error) throw error;
    return data;
  }
};
