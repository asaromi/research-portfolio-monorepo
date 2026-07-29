import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Env } from './common/type'
import reviewRouter from './reviews/reviews.controller'

const app = new Hono<Env>()
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000', 'https://asaromi.pages.dev'] }))
app.get('/', (c) => c.text('Hello Hono!'))

// list of routes
app.route('/reviews', reviewRouter)

export default app
