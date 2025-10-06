
import { createClient } from "@supabase/supabase-js";

// Set Supabase credentials
const supabaseUrl = "https://mwmdmhmqujxxsvujbwwl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bWRtaG1xdWp4eHN2dWpid3dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NTI3ODAsImV4cCI6MjA3MjAyODc4MH0.EFMr5c2LVmSdo8gIhD4V0vVyD4uLHsfWboF1ruzI2Hk";

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
