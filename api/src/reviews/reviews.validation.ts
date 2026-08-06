import { z, ZodType } from 'zod'
import { ReviewDto } from './review.dto'

export class ReviewsValidation {
	static readonly CREATE: ZodType<ReviewDto> = z.object({
		id: z.ulid(),
		full_name: z.string().min(1).max(32).nonoptional(),
		company: z.string().min(1).max(64).nonoptional(),
		review: z.string().max(4000).nonoptional(),
		relation: z.enum(['colleague', 'manager', 'client']).optional(),
		position: z.string().optional(),
	})
}