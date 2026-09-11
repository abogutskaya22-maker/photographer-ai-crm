import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://babtbtchylarpdhrfjhv.supabase.co";
const supabasePublishableKey = "sb_publishable_J83hdnk_brLSD0d58d4QeQ_B6tY_jcD";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
