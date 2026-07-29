import { Hono } from 'hono'
import { Env, Pagination } from '../common/type'
import { connectSupabase } from '../common/common.middleware'
import { ReviewResponse } from './review.dto'
import { getReviews } from './reviews.service'
import { ApiResponse } from '../common/common.dto'

const reviewRouter = new Hono<Env>()
reviewRouter.use(connectSupabase)
reviewRouter.get(
	'/',
	async (c) => c.json(
		new ApiResponse<Pagination<ReviewResponse>>(await getReviews(c) as unknown as Pagination<ReviewResponse>),
	),
)

export default reviewRouter