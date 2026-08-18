export const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || ''
export const STRIPE_WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_KEY || ''

export const PAYMENT_METHODS = ['card']
export const SHIPPING_COUNTRIES = ['US', 'ID', 'PH', 'SG', 'AU', 'TH', 'BN', 'MY']