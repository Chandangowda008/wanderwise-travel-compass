// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ookykqudhufqdwdoxbsc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9va3lrcXVkaHVmcWR3ZG94YnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzI5MzEsImV4cCI6MjA2NzgwODkzMX0.bfiBjCO5uhgLZeqEy4yoTjhVhd8LLGNbCyrWsufSGS4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});