import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://grfbratwsbjgfevtymac.supabase.co";
const supabaseKey = "sb_publishable_vO6B1olb8cXsaqJQliKRZQ_2eflMa0o"; // from Supabase dashboard → Project Settings → API
export const supabase = createClient(supabaseUrl, supabaseKey);
