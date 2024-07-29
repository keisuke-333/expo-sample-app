import { Database } from "@/supabase/schema"

export type TodoType = Database["public"]["Tables"]["todos"]["Row"]
