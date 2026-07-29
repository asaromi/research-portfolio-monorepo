import { SupabaseClient } from '@supabase/supabase-js'
import { ReviewDto } from './review.dto'
import { Pagination } from '../common/type'
import { SupabaseConnector } from '../common/supabaseConnector'

const supabaseClient = new SupabaseConnector()

export class ReviewsRepository {
	private supabase: SupabaseClient

	constructor() {
		this.supabase = supabaseClient.getSupabase()
	}

	async getReviews(params?: Record<string, unknown>): Promise<Pagination<ReviewDto>> {
		const { page, perPage } = (params || {}) as { page: number, perPage: number }

		const { data, error } = await this.supabase.from('reviews').select('*')
			.order('created_at', { ascending: false })
			.range((page - 1) * perPage, page * perPage - 1)

		if (error) {
			throw error
		}

		return { rows: (data || []) as ReviewDto[], page, perPage } as Pagination<ReviewDto>
	}
}