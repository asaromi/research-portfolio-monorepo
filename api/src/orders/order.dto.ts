import { FieldValue } from 'firebase/firestore/lite'
import { Timestamp } from '@firebase/firestore/lite'

export type OrderDto = {
	id?: string;
	amount: number;
	amount_shipping: number;
	images: string[];
	items: OrderItemDto[];
	timestamp: Timestamp;
}

export type OrderItemDto = { title: string; price: number; description: string; image: string; }

export class OrderResponse {
	id?: string
	amount!: number
	amount_shipping!: number
	images!: string[]
	items!: OrderItemDto[]
	timestamp!: Timestamp

	static from(order: OrderDto) {
		const res = new OrderResponse()

		res.id = order.id
		res.amount = order.amount
		res.amount_shipping = order.amount_shipping
		res.images = order.images
		res.items = order.items
		res.timestamp = order.timestamp

		return res
	}
}