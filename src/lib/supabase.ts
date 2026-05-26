import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ DJX: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
    'The site will show but data won\'t load. ' +
    'Add these to your .env file or GitHub Secrets.'
  );
}

// Create client even if env vars are missing — components handle the null case
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export default supabase;
