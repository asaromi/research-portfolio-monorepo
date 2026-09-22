import { ZodError, ZodType } from 'zod'

export class UtilValidation {
	validate<T>(zodType: ZodType<T>, data: T): T {
		return zodType.parse(data)
	}

	parseError(error: ZodError): string {
		return error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ')
	}
}