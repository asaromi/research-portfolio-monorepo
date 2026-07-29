export type ReviewDto = {
	id: string,
	createdAt: Date,
	updatedAt: Date,
}

export class ReviewResponse {
	private id!: string
	private createdAt!: Date
	private updatedAt!: Date

	static from(review: ReviewDto) {
		const response = new ReviewResponse()
		response.id = review.id
		response.createdAt = review.createdAt
		response.updatedAt = review.updatedAt
		return response
	}
}