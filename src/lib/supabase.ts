import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://gfexcunisdcznuzoxqqq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZXhjdW5pc2Rjem51em94cXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMjA2ODksImV4cCI6MjEwNTU5NjY4OX0.eryuEZ_BEuVNvsAqujHlMXBvAZSzMH4UxfWNC3p69LM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
 