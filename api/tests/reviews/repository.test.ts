import { describe, it, expect, afterAll } from 'vitest'
import { ReviewsRepository } from '../../src/reviews/reviews.repository'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_SECRET_KEY || '',
	{ db: { schema: 'testing' as 'public' } }
)

describe('ReviewsRepository', () => {
	const repo = new ReviewsRepository(supabase)

	afterAll(async () => {
		// Clean up testing data
		await supabase.from('reviews').delete().neq('id', '')
	})

	describe('getReviews', () => {
		it('returns paginated rows on success', async () => {
			// First, ensure at least one record exists
			await repo.createReview({
				full_name: 'John Test',
				company: 'Test Co',
				review: 'Real DB Test',
				relation: 'direct'
			} as any)

			const result = await repo.getReviews({ page: 1, per_page: 10 })

			expect(result.count).toBeGreaterThan(0)
			expect(result.rows.length).toBeGreaterThan(0)
			expect(result.rows[0]).toHaveProperty('full_name')
			expect(result.rows[0].full_name).toEqual('John Test')
			expect(result.page).toBe(1)
			expect(result.per_page).toBe(10)
		})

		it('defaults to page=1, per_page=10 when no params given', async () => {
			const result = await repo.getReviews()
			expect(result.page).toBe(1)
			expect(result.per_page).toBe(10)
		})
	})

	describe('createReview', () => {
		it('generates an id and returns inserted id', async () => {
			const payload = { full_name: 'Jane Real', company: 'Real Acme', review: 'Actual DB Insert', relation: 'mentor' } as any
			const result = await repo.createReview(payload)

			expect(result).toHaveProperty('id')

			// Verify it actually exists in DB
			const { data, error } = await supabase.from('reviews').select('id').eq('id', result.id).single()
			// expect data as object

			expect(data).toHaveProperty('id')
			expect(data?.id).toBe(result.id)
		})

		it('keeps existing id when payload already has one', async () => {
			const existingId = '01AN4Z048SQ5CE7P2XDRPH4KY' + Math.floor(Math.random() * 10)
			const payload = { id: existingId, full_name: 'Jane Existing', company: 'Acme', review: 'Nice', relation: 'manager' } as any
			const result = await repo.createReview(payload)

			expect(result.id).toBe(existingId)
			
			const { data, error } = await supabase.from('reviews').select('id, full_name').eq('id', existingId).single()
			expect(data?.id).toBe(existingId)
		})
	})
})