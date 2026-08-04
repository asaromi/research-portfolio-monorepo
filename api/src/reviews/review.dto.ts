import { Pagination } from '../common/type'

export type ReviewRelation = 'colleague' | 'manager' | 'client'

export type ReviewDto = {
	id: string;
	full_name: string;
	company: string;
	review: string;
	position?: string;
	relation?: ReviewRelation;
	created_at?: Date;
	updated_at?: Date;
}

export class ReviewResponse {
	private id!: string
	private full_name!: string
	private company!: string
	private review!: string
	private position?: string
	private relation?: string
	private created_at?: Date

	static from(review: ReviewDto): ReviewResponse {
		const response = new ReviewResponse()
		response.id = review.id
		response.full_name = review.full_name
		response.position = review?.position
		response.company = review.company
		response.relation = review?.relation
		response.review = review.review
		response.created_at = review?.created_at
		return response
	}

	static paginate(pagination: Pagination<ReviewDto>): Pagination<ReviewResponse> {
		return {
			...pagination,
			rows: pagination.rows.map(ReviewResponse.from)
		}
	}
}