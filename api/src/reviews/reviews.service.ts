import { Context } from 'hono'
import { SupabaseClient } from '@supabase/supabase-js'
import { ReviewsRepository } from './reviews.repository'
import { ReviewResponse } from './review.dto'

const reviewRepo = new ReviewsRepository()

export const getReviews = async (c: Context) => {
	console.group('getReviews')
	try {
		const supabase = c.get('supabase') as SupabaseClient

		const { rows: reviews, ...pagination } = await reviewRepo.getReviews()
		console.log({ supabase, reviews })

		return { ...pagination, rows: reviews.map(ReviewResponse.from) }
	} catch (error) {
		console.error(error)
	} finally {
		console.groupEnd()
	}
}