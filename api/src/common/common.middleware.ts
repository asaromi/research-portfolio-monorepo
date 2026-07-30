import { Context, Next } from 'hono'
import { createClient } from '@supabase/supabase-js'

export const connectSupabase = async (c: Context, next: Next) => {
	try {
		const supabase = createClient(
			c.env.SUPABASE_URL,
			c.env.SUPABASE_SECRET_KEY,
			{ auth: { persistSession: false} }
		)

		c.set('supabase', supabase)

		await next()
	} catch (error) {
		console.error('Error connecting to Supabase:', error)
	}
}