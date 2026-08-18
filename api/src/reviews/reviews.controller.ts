import { Context, Hono } from 'hono'
import { createReview, getReviews } from './reviews.service'
import { ReviewsValidation } from './reviews.validation'
import { ApiResponse } from '../common/dtos/common.dto'
import { onConnectSupabase, onErrorRequest, zodValidate } from '../common/middlewares/middleware.supabase'
import { Env } from '../common/type'

const reviewRouter = new Hono<Env>()

export const onGetReviews = async (c: Context<Env>) => {
	const data = await getReviews(c)
	return c.json(ApiResponse.success(data))
}

export const onCreateReview = async (c: Context<Env>) => {
	const data = await createReview(c)
	return c.json(ApiResponse.success(data, 'Review created successfully'), 201)
}

reviewRouter.onError(onErrorRequest)
reviewRouter.use(onConnectSupabase)

reviewRouter.get('/', onGetReviews)
reviewRouter.post('/', zodValidate(ReviewsValidation.CREATE), onCreateReview)

export default reviewRouter