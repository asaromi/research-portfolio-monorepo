import * as fs from 'node:fs'
import * as path from 'node:path'

const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
	const envContent = fs.readFileSync(envPath, 'utf-8')
	envContent.split('\n').forEach(line => {
		const [key, ...valueParts] = line.split('=')
		if (key && valueParts.length > 0) {
			process.env[key.trim()] = valueParts.join('=').trim()
		}
	})
}
