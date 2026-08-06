import { Hono } from 'hono'
import { createReview, getReviews } from './reviews.service'
import { ApiResponse } from '../common/common.dto'
import { connectSupabase } from '../common/common.middleware'
import { Env } from '../common/type'

const reviewRouter = new Hono<Env>()
reviewRouter.use(connectSupabase)
reviewRouter.get('/', async (c) => c.json(new ApiResponse(await getReviews(c))))
reviewRouter.post('/', async (c) => c.json(new ApiResponse(await createReview(c)), 201))

export default reviewRouter