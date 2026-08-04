import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ReviewsRepository } from '../../src/reviews/reviews.repository'

vi.mock('../../src/utils/util.supabase', () => ({
	SupabaseConnector: class {
		getSupabase() {
			return mockSupabase
		}
	},
}))

vi.mock('../../src/utils/util.ulid', () => ({
	Ulid: { generate: () => 'mock-ulid-id' },
}))

// chainable supabase mock, reassigned per-test
let mockSupabase: any

function buildSelectChain(result: { data: unknown; error: unknown; count: number | null }) {
	const chain: any = {}
	chain.select = vi.fn(() => chain)
	chain.order = vi.fn(() => chain)
	chain.range = vi.fn(() => Promise.resolve(result))
	return chain
}

function buildInsertChain(result: { data: unknown; error: unknown; count: number | null }) {
	const chain: any = {}
	chain.insert = vi.fn(() => chain)
	chain.select = vi.fn(() => chain)
	chain.single = vi.fn(() => Promise.resolve(result))
	return chain
}

describe('ReviewsRepository', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('getReviews', () => {
		it('returns paginated rows on success', async () => {
			const rows = [{ id: '1', full_name: 'John', company: 'Acme', review: 'Great' }]
			mockSupabase = {
				from: vi.fn(() => buildSelectChain({ data: rows, error: null, count: 1 })),
			}

			const repo = new ReviewsRepository()
			const result = await repo.getReviews({ page: 1, per_page: 10 })

			expect(result).toEqual({ count: 1, rows, page: 1, per_page: 10 })
		})

		it('defaults to page=1, per_page=10 when no params given', async () => {
			mockSupabase = {
				from: vi.fn(() => buildSelectChain({ data: [], error: null, count: 0 })),
			}

			const repo = new ReviewsRepository()
			const result = await repo.getReviews()

			expect(result.page).toBe(1)
			expect(result.per_page).toBe(10)
			expect(result.rows).toEqual([])
		})

		it('throws when supabase returns an error', async () => {
			const dbError = new Error('DB connection failed')
			mockSupabase = {
				from: vi.fn(() => buildSelectChain({ data: null, error: dbError, count: null })),
			}

			const repo = new ReviewsRepository()
			await expect(repo.getReviews()).rejects.toThrow('DB connection failed')
		})

		it('returns empty rows array when data is null', async () => {
			mockSupabase = {
				from: vi.fn(() => buildSelectChain({ data: null, error: null, count: 0 })),
			}

			const repo = new ReviewsRepository()
			const result = await repo.getReviews()

			expect(result.rows).toEqual([])
		})
	})

	describe('createReview', () => {
		it('generates an id when payload has none and returns inserted id', async () => {
			mockSupabase = {
				from: vi.fn(() => buildInsertChain({ data: { id: 'mock-ulid-id' }, error: null, count: 1 })),
			}

			const repo = new ReviewsRepository()
			const payload = { full_name: 'Jane', company: 'Acme', review: 'Nice' } as any
			const result = await repo.createReview(payload)

			expect(payload.id).toBe('mock-ulid-id')
			expect(result).toEqual({ id: 'mock-ulid-id' })
		})

		it('keeps existing id when payload already has one', async () => {
			mockSupabase = {
				from: vi.fn(() => buildInsertChain({ data: { id: 'existing-id' }, error: null, count: 1 })),
			}

			const repo = new ReviewsRepository()
			const payload = { id: 'existing-id', full_name: 'Jane', company: 'Acme', review: 'Nice' } as any
			const result = await repo.createReview(payload)

			expect(result).toEqual({ id: 'existing-id' })
		})

		it('throws supabase error when insert fails', async () => {
			const dbError = new Error('Insert failed')
			mockSupabase = {
				from: vi.fn(() => buildInsertChain({ data: null, error: dbError, count: null })),
			}

			const repo = new ReviewsRepository()
			await expect(
				repo.createReview({ full_name: 'Jane', company: 'Acme', review: 'Nice' } as any)
			).rejects.toThrow('Insert failed')
		})

		it('throws generic error when no error but missing id/count', async () => {
			mockSupabase = {
				from: vi.fn(() => buildInsertChain({ data: {}, error: null, count: null })),
			}

			const repo = new ReviewsRepository()
			await expect(
				repo.createReview({ full_name: 'Jane', company: 'Acme', review: 'Nice' } as any)
			).rejects.toThrow('Something went wrong: insert review')
		})
	})
})