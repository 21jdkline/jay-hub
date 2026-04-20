import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qlksnddlijlwgysovrky.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Single-user personal hub — stable user id baked into every jay_hub_* row.
// Matches jay_hub_profiles.id and user_id columns on the other jay_hub_* tables.
// (FKs to auth.users were dropped 2026-04-20 for single-user setup; RLS now
//  permissive on jay_hub_* policies.)
export const JAY_USER_ID = '00000000-0000-0000-0000-000000000001'
