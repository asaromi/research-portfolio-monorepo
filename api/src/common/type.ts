import { SupabaseClient } from '@supabase/supabase-js'

export type Env = {
	Bindings: {
		SUPABASE_PUBLISHABLE_KEY: string;
		SUPABASE_URL: string;
	},
	Variables: {
		supabase: SupabaseClient;
	},
}

export type Pagination<T> = {
	rows: T[];
	page: number;
	perPage: number;
}