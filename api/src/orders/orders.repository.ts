import {
	Firestore,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
	Timestamp,
} from '@firebase/firestore/lite'
import { FIREBASE_CONFIG } from '../common/constants/constant.firebase'
import { FirebaseClient } from '../common/libs'
import { Ulid } from '../common/utils/util.ulid'
import { OrderDto } from './order.dto'

const firebaseClient = new FirebaseClient(FIREBASE_CONFIG)
const CACHE_INTERVAL = 10

const getOrderPathByUserId = (userId: string) => `/projects/next-amazon/users/${userId}/orders`
const getOrderRefByUserId = (firestore: Firestore, userId: string) => collection(firestore, getOrderPathByUserId(userId))

export class OrdersRepository {
	firestore: Firestore

	constructor(firestore?: Firestore) {
		this.firestore = firestore instanceof Firestore ? firestore : firebaseClient.firestore
	}

	async getOrdersByUserId(userId: string) {
		if (!userId) throw new Error('userId is required')

		const orderSnap = await getDocs(
			query(
				getOrderRefByUserId(this.firestore, userId),
				orderBy('id', 'desc'),
				limit(10),
			),
		)

		return orderSnap.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
			timestamp: doc.data()?.timestamp?.toDate(),
		}))
	}

	async createOrderByUserId(userId: string, data: OrderDto) {
		const docRef = doc(this.firestore, getOrderPathByUserId(userId), Ulid.generate())

		console.log({ docRef })
		await setDoc(docRef, {
			id: docRef.id,
			amount: data.amount / 100,
			amount_shipping: data.amount_shipping / 100,
			images: data.images,
			timestamp: data.timestamp || Timestamp.now(),
			items: data.items,
		})

		const docSnap = await getDoc(docRef)
		if (!docSnap.exists()) {
			throw new Error(`Failed to create new doc with id: ${docRef.id}`)
		}

		return docSnap.data()
	}
}