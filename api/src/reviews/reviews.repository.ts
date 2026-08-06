import { SupabaseClient } from '@supabase/supabase-js'
import { ReviewDto } from './review.dto'
import { Pagination } from '../common/type'
import { initSupabase } from '../utils/util.supabase'
import { Ulid } from '../utils/util.ulid'

export class ReviewsRepository {
	private supabase: SupabaseClient

	constructor(supabaseClient?: SupabaseClient, ) {
		this.supabase = supabaseClient instanceof SupabaseClient ? supabaseClient : initSupabase().getSupabase()
	}

	async getReviews(params?: Record<string, unknown>): Promise<Pagination<ReviewDto>> {
		const { page = 1, per_page = 10 } = (params || {}) as { page: number, per_page: number }
		const offset = (page - 1) * per_page

		const { data, error, count } = await this.supabase.from('reviews').select('*', { count: 'exact' })
			.order('created_at', { ascending: false })
			.range(offset, page * per_page - 1)

		if (error) {
			throw error
		}

		return { count, rows: (data || []) as ReviewDto[], page, per_page } as Pagination<ReviewDto>
	}

	async createReview(payload: ReviewDto): Promise<{ id: string }> {
		if (!payload.id) payload.id = Ulid.generate()

		const { count, data, error } = await this.supabase.from('reviews')
			.insert(
				payload, { count: 'exact' }
			)
			.select('id')
			.single()

		if (error || !data?.id || !count) {
			throw error ?? new Error('Something went wrong: insert review')
		}

		return data
	}
}