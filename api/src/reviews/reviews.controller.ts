import { Hono } from 'hono'
import { ApiResponse } from '../common/common.dto'
import { connectSupabase } from '../common/common.middleware'
import { Env } from '../common/type'
import { getReviews } from './reviews.service'

const reviewRouter = new Hono<Env>()
reviewRouter.use(connectSupabase)
reviewRouter.get('/', async (c) => c.json(new ApiResponse(await getReviews(c))))

export default reviewRouter