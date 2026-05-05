import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://YOUR_PROJECT.supabase.co";
const supabaseKey = "YOUR_ANON_KEY"; // from Supabase dashboard → Project Settings → API
export const supabase = createClient(supabaseUrl, supabaseKey);
