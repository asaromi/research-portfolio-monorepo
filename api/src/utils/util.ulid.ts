import { monotonicFactory } from 'ulidx'

export class Ulid {
	private static getId = monotonicFactory()

	static generate(unixTime?: number): string {
		return this.getId(unixTime || Date.now()).toString().toLowerCase()
	}
}