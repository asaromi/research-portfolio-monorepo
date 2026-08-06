import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || ''
const SUPABASE_URL = process.env.SUPABASE_URL || ''


export const initSupabase = (schema: string = 'public') => new SupabaseConnector(schema as 'public')

export class SupabaseConnector {
	private supabase: SupabaseClient

	constructor(schema: string) {
		this.supabase = createClient(
			SUPABASE_URL,
			SUPABASE_SECRET_KEY,
			{
				auth: { persistSession: false },
				db: { schema: schema as 'public' }
			},
		)
	}

	public getSupabase() {
		return this.supabase
	}
}