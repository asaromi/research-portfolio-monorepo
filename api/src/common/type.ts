import { SupabaseClient } from '@supabase/supabase-js'

export type Env = {
	Bindings: {
		SUPABASE_SECRET_KEY: string;
		SUPABASE_URL: string;
	},
	Variables: {
		supabase: SupabaseClient;
	},
}

export type Pagination<T> = {
	count: number;
	page: number;
	perPage: number;
	rows: T[];
}