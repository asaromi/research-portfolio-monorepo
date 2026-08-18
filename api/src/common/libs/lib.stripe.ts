import { Stripe } from 'stripe'
import { OrderItemDto } from '../../orders/order.dto'
import { PAYMENT_METHODS, SHIPPING_COUNTRIES, STRIPE_KEY } from '../constants/constant.stripe'

export const SUCCESS_URL = process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/checkout/success` : ''
export const CANCEL_URL = process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/checkout/cancel` : ''

export class StripeClient {
	client!: Stripe

	constructor(stripeClient?: Stripe) {
		this.client = stripeClient instanceof Stripe ? stripeClient : new Stripe(STRIPE_KEY)
	}

	transformItems(items: Array<OrderItemDto>) {
		return items.map(i => ({
			quantity: 1,
			price_data: {
				currency: 'usd',
				unit_amount: i.price * 100,
				product_data: {
					description: i.description,
					name: i.title,
					images: [i.image],
				},
			},
		}))
	}

	checkoutOrderItems({ email, items }: { items: Array<OrderItemDto>, email: string }) {
		return this.client.checkout.sessions.create({
			mode: 'payment',
			payment_method_types: PAYMENT_METHODS,
			shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
			line_items: this.transformItems(items),
			success_url: SUCCESS_URL,
			cancel_url: CANCEL_URL,
			metadata: { email, images: JSON.stringify(items.map(i => i.image)) },
		})
	}
}

export default StripeClient