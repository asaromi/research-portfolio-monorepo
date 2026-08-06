import { Context } from 'hono'
import { ReviewsRepository } from './reviews.repository'
import { ReviewResponse } from './review.dto'
import { Env, Pagination } from '../common/type'
import { Ulid } from '../utils/util.ulid'
import { UtilValidation } from '../utils/util.validation'
import { SupabaseClient } from '@supabase/supabase-js'

const validation = new UtilValidation()

export const getReviews = async (c: Context<Env>): Promise<Pagination<ReviewResponse>> => {
	const supabase = c.var.supabase
	const reviewRepository = new ReviewsRepository(supabase)
	const { rows: reviews, ...pagination } = await reviewRepository.getReviews(c.req.query())
	return ReviewResponse.paginate({ ...pagination, rows: reviews })
}

export const createReview = async (c: Context<Env>) => {
	const supabase = c.var.supabase
	const reviewRepository = new ReviewsRepository(supabase)
	const body = await c.req.json()
	const validated = {
		id: Ulid.generate(),
		...body,
	}

	return await reviewRepository.createReview(validated)
}