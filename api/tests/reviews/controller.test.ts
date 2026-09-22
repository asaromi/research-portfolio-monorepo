import { afterAll, describe, expect, it } from 'vitest'
import reviewRouter from '../../src/reviews/reviews.controller'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_SECRET_KEY || '',
	{ db: { schema: 'testing' } }
)

const env = {
	SUPABASE_URL: process.env.SUPABASE_URL || '',
	SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY || '',
}

describe('reviews.controller', () => {
	afterAll(async () => {
		await supabase.from('reviews').delete().neq('id', '')
	})

	it('GET / returns ApiResponse with paginated reviews', async () => {
		// Ensure data exists
		await reviewRouter.request('http://localhost/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				full_name: 'Jane Controller',
				company: 'Acme',
				review: 'Controller Test',
				relation: 'direct',
			}),
		}, env)

		const res = await reviewRouter.request('http://localhost/', {}, env)
		const body = (await res.json()) as any

		expect(res.status).toBe(200)
		expect(body.data).toHaveProperty('rows')
		expect(body.data.rows.length).toBeGreaterThan(0)
	})

	it('POST / returns 201 with ApiResponse payload', async () => {
		const res = await reviewRouter.request('http://localhost/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				full_name: 'Jane Controller 2',
				company: 'Acme',
				review: 'Controller Test 2',
				relation: 'direct',
			}),
		}, env)
		const body = (await res.json()) as any

		expect(res.status).toBe(201)
		expect(body).toEqual({
			data: { id: expect.any(String) },
			message: 'Review created successfully',
		})
	})

	it('POST / returns 400 for missing fields', async () => {
		const res1 = await reviewRouter.request('http://localhost/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				full_name: 'Jane',
				company: 'Acme',
				// review: 'Great work',
				// Missing review
			}),
		}, env)

		const body = (await res1.json()) as any

		expect(res1.status).toBe(400)
		expect(body.error).toBe('VALIDATION_ERROR')
		expect(body.message).toContain('review')

		const res2 = await reviewRouter.request('http://localhost/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				full_name: 'Jane',
				// company: 'Acme',
				review: 'Great work',
				// Missing review
			}),
		}, env)

		const body2 = (await res2.json()) as any

		expect(res2.status).toBe(400)
		expect(body2.error).toBe('VALIDATION_ERROR')
		expect(body2.message).toContain('company')

		const res3 = await reviewRouter.request('http://localhost/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				// full_name: 'Jane',
				company: 'Acme',
				review: 'Great work',
				// Missing review
			}),
		}, env)

		const body3 = (await res3.json()) as any

		expect(res3.status).toBe(400)
		expect(body3.error).toBe('VALIDATION_ERROR')
		expect(body3.message).toContain('full_name')
	})

	it('POST / returns 400 for multiple Zod validation errors', async () => {
		const res = await reviewRouter.request('http://localhost/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				// Missing all required fields
			}),
		}, env)
		const body = (await res.json()) as any

		expect(res.status).toBe(400)
		expect(body.error).toBe('VALIDATION_ERROR')
		expect(body.message).toContain('full_name')
		expect(body.message).toContain('company')
		expect(body.message).toContain('review')
	})

	it('POST / returns 400 for invalid relation enum value', async () => {
		const res = await reviewRouter.request('http://localhost/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				full_name: 'Jane',
				company: 'Acme',
				review: 'Great work',
				relation: 'invalid-relation',
			}),
		}, env)
		const body = (await res.json()) as any

		expect(res.status).toBe(400)
		expect(body.error).toBe('VALIDATION_ERROR')
		expect(body.message).toContain('relation')
	})

	it('POST / returns 400 for full_name exceeding max length', async () => {
		const res = await reviewRouter.request('http://localhost/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				full_name: 'A'.repeat(33), // Max is 32
				company: 'Acme',
				review: 'Great work',
				relation: 'direct',
			}),
		}, env)
		const body = (await res.json()) as any

		expect(res.status).toBe(400)
		expect(body.error).toBe('VALIDATION_ERROR')
		expect(body.message).toContain('full_name')
	})
})