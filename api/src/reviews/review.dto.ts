export type ReviewDto = {
	id: string;
	full_name: string;
	position: string;
	company: string;
	relation: string;
	review: string;
	created_at: Date;
	updated_at: Date;
}

export class ReviewResponse {
	private id!: string
	private full_name!: string
	private position!: string
	private company!: string
	private relation!: string
	private review!: string

	static from(review: ReviewDto) {
		const response = new ReviewResponse()
		response.id = review.id
		response.full_name = review.full_name
		response.position = review.position
		response.company = review.company
		response.relation = review.relation
		response.review = review.review
		return response
	}
}