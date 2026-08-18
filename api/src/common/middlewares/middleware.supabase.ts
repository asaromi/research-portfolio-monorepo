import { zValidator } from '@hono/zod-validator'
import { Context, Next } from 'hono'
import { ContentfulStatusCode } from 'hono/utils/http-status'
import { createMiddleware } from 'hono/factory'
import { ZodError, ZodType } from 'zod'
import { ApiResponse } from '../dtos/common.dto'
import { initSupabase } from '../libs'
import { UtilValidation } from '../utils/util.validation'
import { Env, ErrorObject } from '../type'

const validation = new UtilValidation()

export const onConnectSupabase = createMiddleware<Env>(async (c: Context<Env>, next: Next) => {
	const SUPABASE_SCHEMA = c.env.SUPABASE_SCHEMA
	c.set('supabase', initSupabase(SUPABASE_SCHEMA).getSupabase())

	await next()
})

export const onErrorRequest = (err: Error | ErrorObject, c: Context) => {
	const { type, code } = err as ErrorObject
	const { cause } = err as Error

	console.error(err)
	return c.json(
		ApiResponse.error(
			type || 'INTERNAL_SERVER_ERROR',
			err?.message || 'Internal Server Error',
		),
		code || cause as ContentfulStatusCode || 500,
	)
}

export const zodValidate = (VALIDATION_SCHEMA: ZodType) =>
	zValidator(
		'json',
		VALIDATION_SCHEMA,
		(result, c) => {
			let error: ErrorObject = !result.success && result?.error as Error ? { data: result.error } : {
				code: 500,
				type: 'INTERNAL_SERVER_ERROR',
			}

			if (error.data instanceof ZodError) {
				error.message = validation.parseError(error.data)
				error.code = 400
				error.type = 'VALIDATION_ERROR'
			}

			if (!result.success) {
				return onErrorRequest(error, c)
			}
		},
	)