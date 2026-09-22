import { Hono } from 'hono'
import { createReview, getReviews } from './reviews.service'
import { ReviewsValidation } from './reviews.validation'
import { ApiResponse } from '../common/common.dto'
import { onConnectSupabase, onErrorRequest, zodValidate } from '../common/common.middleware'
import { Env } from '../common/type'

const reviewRouter = new Hono<Env>()

reviewRouter.use(onConnectSupabase)
reviewRouter.onError(onErrorRequest)

reviewRouter.get('/', async (c) => {
	const data = await getReviews(c)
	return c.json(ApiResponse.success(data))
})

reviewRouter.post(
	'/',
	zodValidate(ReviewsValidation.CREATE),
	async (c) => {
		const data = await createReview(c)
		return c.json(ApiResponse.success(data, 'Review created successfully'), 201)
	},
)

export default reviewRouter