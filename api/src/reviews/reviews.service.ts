import { Context } from 'hono'
import { SupabaseClient } from '@supabase/supabase-js'
import { ReviewsRepository } from './reviews.repository'
import { ReviewResponse } from './review.dto'
import { Pagination } from '../common/type'

const reviewRepo = new ReviewsRepository()

export const getReviews = async (c: Context): Promise<Pagination<ReviewResponse>> => {
	console.group('getReviews')
	try {
		const supabase = c.get('supabase') as SupabaseClient

		const { rows: reviews, ...pagination } = await reviewRepo.getReviews()
		console.log({ supabase, reviews })

		return ReviewResponse.paginate({ ...pagination, rows: reviews })
	} catch (error) {
		console.error(error)
		return { count: 0, page: 1, perPage: 10, rows: [] }
	} finally {
		console.groupEnd()
	}
}