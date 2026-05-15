import { supabase } from './supabaseClient';

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
      .select(); 
    
    if (error) throw error;
    return data;
  }
};
