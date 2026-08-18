import { getApps, initializeApp, FirebaseApp, FirebaseOptions } from '@firebase/app'
import { Firestore, getFirestore, initializeFirestore } from '@firebase/firestore/lite'

export class FirebaseClient {
	firebase!: FirebaseApp
	firestore!: Firestore

	constructor(firebaseConfig: FirebaseOptions) {
		this.firebase = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
		this.firestore = getFirestore(this.firebase) || initializeFirestore(this.firebase, {})
	}
}

export default FirebaseClient