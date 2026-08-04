import { Context } from 'hono'
import { ReviewsRepository } from './reviews.repository'
import { ReviewResponse } from './review.dto'
import { ReviewsValidation } from './reviews.validation'
import { ApiResponse } from '../common/common.dto'
import { Pagination } from '../common/type'
import { Ulid } from '../utils/util.ulid'
import { UtilValidation } from '../utils/util.validation'
import { ZodError } from 'zod'

const validation = new UtilValidation()
const reviewRepository = new ReviewsRepository()

export const getReviews = async (c: Context): Promise<Pagination<ReviewResponse>> => {
	console.group('getReviews')
	try {
		const { rows: reviews, ...pagination } = await reviewRepository.getReviews(c.req.query())
		return ReviewResponse.paginate({ ...pagination, rows: reviews })
	} catch (error) {
		console.error(error)
		return { count: 0, page: 1, per_page: 10, rows: [] }
	} finally {
		console.groupEnd()
	}
}

export const createReview = async (c: Context) => {
	console.group('service.createReview')

	try {
		const validated = validation.validate(ReviewsValidation.CREATE, {
			...(await c.req.json()),
			id: Ulid.generate()
		})

		return await reviewRepository.createReview(validated)
	} catch (e) {
		console.error(e)
		return new ApiResponse(
			null,
			e instanceof ZodError
				? validation.parseError(e)
				: e instanceof Error ? e.message : 'Internal Server Error'
		)
	} finally {
		console.groupEnd()
	}
}