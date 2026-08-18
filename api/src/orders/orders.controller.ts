import { Context, Hono } from 'hono'
import { Env } from '../common/type'
import { ApiResponse } from '../common/dtos/common.dto'
import { checkoutOrder, getOrders } from './orders.service'

const orderRouterV1 = new Hono<Env>().basePath('/v1')

export const onGetOrders = async (c: Context<Env>) =>
	c.json(ApiResponse.success(await getOrders(c)))
export const onCheckoutStripe = async (c: Context<Env>) =>
	c.json(ApiResponse.success(await checkoutOrder(c)))
export const onListenWebhookStripe = async (c: Context<Env>) =>
	c.json(ApiResponse.success(null, 'Webhook event triggered'))

orderRouterV1.get('/:userId', onGetOrders)
orderRouterV1.post('/:userId/checkout', onCheckoutStripe)
orderRouterV1.post('/stripe-webhook', onListenWebhookStripe)

export default orderRouterV1