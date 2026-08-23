import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mzvfsetcqrrhbnxvwcak.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dmZzZXRjcXJyaGJueHZ3Y2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NjY5NjksImV4cCI6MjEwMzA0Mjk2OX0.yzXaDc6QJBy-37dfNb1u-dcqg3heOaDQXmdfLMTD6TE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
