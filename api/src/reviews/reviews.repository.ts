import { SupabaseClient } from '@supabase/supabase-js'
import { ReviewDto } from './review.dto'
import { Pagination } from '../common/type'
import { SupabaseConnector } from '../common/supabase.connect'

const supabaseClient = new SupabaseConnector()

export class ReviewsRepository {
	private supabase: SupabaseClient

	constructor() {
		this.supabase = supabaseClient.getSupabase()
	}

	async getReviews(params?: Record<string, unknown>): Promise<Pagination<ReviewDto>> {
		const { page = 1, perPage = 10 } = (params || {}) as { page: number, perPage: number }
		const offset = (page - 1) * perPage

		const { data, error, count } = await this.supabase.from('reviews').select('*', { count: 'exact' })
			.order('created_at', { ascending: false })
			.range(offset, page * perPage - 1)

		if (error) {
			throw error
		}

		console.log({ data, count })

		return { count, rows: (data || []) as ReviewDto[], page, perPage } as Pagination<ReviewDto>
	}
}