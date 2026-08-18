import { Timestamp } from 'firebase/firestore/lite'
import { Context } from 'hono'
import { StripeClient } from '../common/libs'
import { Env } from '../common/type'
import { OrderItemDto } from './order.dto'
import { OrdersRepository } from './orders.repository'

const stripeService = new StripeClient()

export const getOrders = async (c: Context<Env>) => {
	const firestore = c.var.firestore
	const { userId = '' } = c.req.param()

	const orderRepo = new OrdersRepository(firestore)
	return await orderRepo.getOrdersByUserId(userId)
}

export const checkoutOrder = async (c: Context<Env>) => {
	const firestore = c.var.firestore
	const userId = c.req.param('userId') as string
	const { email, items } = await c.req.json() as { email: string; items: Array<OrderItemDto> }
	const orderRepo = new OrdersRepository(firestore)

	const session = await stripeService.checkoutOrderItems({ email, items })

	console.log({ orderRepo, session })
	const orderData = await orderRepo.createOrderByUserId(userId, {
		amount: session.amount_total || 0,
		amount_shipping: session.total_details?.amount_shipping || 0,
		images: JSON.parse(session.metadata?.images || '[]'),
		timestamp: Timestamp.fromDate(new Date(session.created * 1000)),
		items
	})

	return session
}