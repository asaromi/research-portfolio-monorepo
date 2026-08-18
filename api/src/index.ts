import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Env } from './common/type'
import { ApiResponse } from './common/dtos/common.dto'
import reviewRouter from './reviews/reviews.controller'
import orderRouterV1 from './orders/orders.controller'

const app = new Hono<Env>().basePath('/api')
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000', 'https://asaromi.pages.dev', 'https://asaromi.biz.id'] }))
app.get('/', (c) => c.json(new ApiResponse('Hello, World!')))

// list of routes
app.route('/reviews', reviewRouter)
app.route('/orders', orderRouterV1)

export default app
