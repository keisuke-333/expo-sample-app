import { createClient } from "@supabase/supabase-js"
import { Database } from "./schema"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("必要な環境変数が設定されていません")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
