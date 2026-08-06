export const API_URL = import.meta.env.VITE_API_URL || ''

export const getReviews = async () => {
  const res = await fetch(`${API_URL}/api/reviews`)

  if (!res.ok && res.type.includes('json')) {
    const error = await res.json()
    throw new Error(error.message)
  } else if (!res.ok) {
    throw new Error('Failed to fetch reviews')
  }

  return await res.json()
}

/**
 * @typedef {Object} Review
 * @property {string} full_name
 * @property {string} company
 * @property {string} position
 * @property {string} relation
 * @property {string} review
 *
 * Submit Review
 * @param {Review} review
 */
export const submitReview = async (review) => {
  console.log({ body: review })
  if (!review.full_name || !review.company || !review.review) {
    throw new Error('Please fill the required fields: full_name, company, review')
  }

  if (!review.relation) delete review.relation
  if (!review.position) delete review.position

  const res = await fetch(`${API_URL}/api/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });

  if (!res.ok || res.status !== 201) {
    throw new Error('Failed to submit review');
  }

  return await res.json();
}