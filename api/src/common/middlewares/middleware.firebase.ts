import { Context, Next } from 'hono'
import { Env } from '../type'
import { FirebaseClient } from '../libs'
import { FIREBASE_CONFIG } from '../constants/constant.firebase'

export const onConnectFirebase = async (c: Context<Env>, next: Next) => {
	const firebase = new FirebaseClient(FIREBASE_CONFIG)
	c.set('firestore', firebase.firestore)

	await next()
}