import { afterAll, describe, expect, it } from 'vitest'
import { createReview, getReviews } from '../../src/reviews/reviews.service'
import { createClient } from '@supabase/supabase-js'
import { initSupabase } from '../../src/utils/util.supabase'

const supabase = createClient(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_SECRET_KEY || '',
	{ db: { schema: 'testing' } }
)

const buildContext = (query: Record<string, unknown> = {}, body: Record<string, unknown> = {}) =>
	({
		var: { supabase },
		req: {
			query: () => query,
			json: async () => body,
		},
	}) as any

describe('reviews.service', () => {
	afterAll(async () => {
		await supabase.from('reviews').delete().neq('id', '')
	})

	it('getReviews returns mapped pagination data', async () => {
		// Ensure data exists
		await createReview(
			buildContext({}, {
				full_name: 'Jane Service',
				company: 'Acme Service',
				review: 'Service Test',
				relation: 'direct',
				position: 'Engineer',
			}),
		)

		const result = await getReviews(buildContext({ page: 1, per_page: 10 }))

		expect(result).toMatchObject({ count: expect.any(Number), page: 1, per_page: 10 })
		expect(result.rows.length).toBeGreaterThan(0)
		expect(result.rows[0]).toHaveProperty('full_name')
	})

	it('createReview returns inserted review id on success', async () => {
		const result = await createReview(
			buildContext({}, {
				full_name: 'Jane Service 2',
				company: 'Acme Service 2',
				review: 'Service Test 2',
				relation: 'direct',
				position: 'Engineer',
			}),
		)

		expect(result).toHaveProperty('id')
		
		// Verify in DB
		const { data } = await supabase.from('reviews').select('id').eq('id', result.id).single()
		expect(data?.id).toBe(result.id)
	})
})