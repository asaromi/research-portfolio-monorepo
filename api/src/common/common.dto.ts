export class ApiResponse<T> {
	data: T | null
	message?: string
	error?: string

	constructor(data: T | null, message?: string, error?: string) {
		this.data = data
		this.message = message
		this.error = error
	}

	static success<T>(data: T, message?: string): ApiResponse<T> {
		return new ApiResponse(data, message)
	}

	static error<T>(error: string, message?: string): ApiResponse<T> {
		return new ApiResponse<T>(null, message, error)
	}
}