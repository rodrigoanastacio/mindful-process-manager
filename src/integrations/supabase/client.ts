// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sltzlgsdktqlyofbrqex.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsdHpsZ3Nka3RxbHlvZmJycWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MDM5MDIsImV4cCI6MjA1Mjk3OTkwMn0.lEhw93ruIsUgA6r9BfctRYHXCEDQ9rKZFsyLrih3Qws";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);