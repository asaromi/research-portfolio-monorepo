import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		globals: true,
		root: import.meta.dirname,
		setupFiles: ['./tests/setup.ts'],
		fileParallelism: false,
	},
})