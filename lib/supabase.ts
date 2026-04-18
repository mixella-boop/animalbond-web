import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipuri pentru tabelele folosite pe site
export type Animal = {
  id: string
  name: string
  species: string
  breed: string | null
  age_years: number | null
  age_months: number | null
  sex: string | null
  location_city: string | null
  location_county: string | null
  description: string | null
  status: string | null
  expires_at: string | null
  created_at: string
  animal_photos?: AnimalPhoto[]
}

export type AnimalPhoto = {
  id: string
  animal_id: string
  photo_url: string
  is_main: boolean
  order_index: number
}

export type Partner = {
  id: string
  name: string
  category: string
  city: string | null
  description: string | null
  logo_url: string | null
  website_url: string | null
  is_active: boolean
  created_at: string
}

export type PartnerApplication = {
  company_name: string
  category: string
  city: string
  address: string | null
  phone: string
  email: string
  website: string | null
  description: string | null
  gdpr_consent: boolean
}
