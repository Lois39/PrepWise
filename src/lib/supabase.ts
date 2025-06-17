
import { createClient } from "@supabase/supabase-js";

// Set Supabase credentials
const supabaseUrl = "https://yzqvcelbavgwqcrkdxxr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cXZjZWxiYXZnd3FjcmtkeHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Mzk0ODQsImV4cCI6MjA2MDExNTQ4NH0.Ad8EuVOEaqwGDHWUiOrYI_jQ7l0oyysJw0sh2kYzNBo";

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
