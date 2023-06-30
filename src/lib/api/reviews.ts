import { baseUrl, type Photo } from "./places"

enum ReactionEnum {
  Like = "Like",
  Love = "Love",
  Thanks = "Thanks",  
}

type Reaction = {
	React:  ReactionEnum
	UserID:  string
}

export type Review = {
	id                    :string
	placeId               :string
	userId               :string
	content               :string
	photos                :Photo[]
	rating                :number
	reactions             :Reaction[]
	accessibilityFeatures :string[]
	createdAt             :Date
	updatedAt             :Date
}

export async function createReview(review: Review, token: string): Promise<boolean> {
  const data = {
    placeId: review.placeId,
    userId: review.userId,
    content: review.content,
    photos: review.photos,
    rating: review.rating,
    accessibilityFeatures: review.accessibilityFeatures
  }
  // make a Post request to the server
  let req = await fetch(`${baseUrl}/reviews/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
      body: JSON.stringify(data)
    }
  )
  return req.ok
}

export async function findReviewById(reviewId: string): Promise<Review> {
  const req = await fetch(`${baseUrl}/reviews/find?id=${reviewId}`)
  const res: Review = await req.json()
  return res 
}

export async function findReviewByPlaceId(placeId: string): Promise<Review[]> {
  const req = await fetch(`${baseUrl}/reviews/find-by-placeid?placeId=${placeId}`)
  const res: Review[] = await req.json()
  return res 
}

export async function findReviewByUserId(userId: string, token: string): Promise<Review[]> {
  const req = await fetch(`${baseUrl}/reviews/find-by-userid?userId=${userId}`)
  const res: Review[] = await req.json()
  return res 
}

export async function deleteReviewById(id: string, token: string): Promise<void> {
  const req = await fetch(`${baseUrl}/reviews/delete?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export async function addAccessibilityFeature(reviewId: string, feature: string, token: string): Promise<boolean> {
  const req = await fetch(`${baseUrl}/reviews/add-feature?id=${reviewId}&feature=${feature}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return req.ok
}

