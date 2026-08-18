import { SupabaseClient } from '@supabase/supabase-js'
import { ContentfulStatusCode } from 'hono/utils/http-status'
import { Firestore } from '@firebase/firestore/lite'

export type Env = {
	Bindings: {
		SUPABASE_SECRET_KEY: string;
		SUPABASE_URL: string;
		SUPABASE_SCHEMA: 'testing' | 'public';
	},
	Variables: {
		supabase: SupabaseClient;
		firestore: Firestore;
	},
}

export type Pagination<T> = {
	count: number;
	page: number;
	per_page: number;
	rows: T[];
}

export type ErrorType = 'VALIDATION_ERROR' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' |
	'INTERNAL_SERVER_ERROR' | 'BAD_GATEWAY' | 'SERVICE_UNAVAILABLE' | 'GATEWAY_TIMEOUT'

export type ErrorObject = {
	data?: Error;
	code?: ContentfulStatusCode;
	message?: string;
	type?: ErrorType;
}