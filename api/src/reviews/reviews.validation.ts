import { z, ZodType } from 'zod'
import { ReviewDto } from './review.dto'

export class ReviewsValidation {
	static readonly CREATE: ZodType<ReviewDto> = z.object({
		id: z.string().ulid().optional(),
		full_name: z.string().min(1).max(32).nonempty(),
		company: z.string().min(1).max(64).nonempty(),
		review: z.string().max(4000).nonempty(),
		relation: z.enum(['colleague', 'manager', 'direct', 'mentor']).optional().nullable(),
		position: z.string().optional().nullable(),
	})
}