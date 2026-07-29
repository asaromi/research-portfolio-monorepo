import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || ''
const SUPABASE_URL = process.env.SUPABASE_URL || ''

export class SupabaseConnector {
	private supabase: SupabaseClient

	constructor() {
		this.supabase = createClient(
			SUPABASE_URL,
			SUPABASE_PUBLISHABLE_KEY,
			{ auth: { persistSession: false } },
		)
	}

	public getSupabase() {
		return this.supabase
	}
}