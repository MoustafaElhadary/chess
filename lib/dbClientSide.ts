import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";

const supabaseOptions: SupabaseClientOptions = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  };
  
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const dbClientSide = createClient(supabaseUrl, supabaseAnonKey,supabaseOptions);
