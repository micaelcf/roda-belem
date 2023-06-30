import { baseUrl } from "./places"

type Mission = {
	id           :string
	name         :string
	description  :string
	reward       :number
	minimumLevel :number
}

export type User = {
	id        :string
	email     :string
	avatar    :Uint8Array
	username  :string
	password  :string
	points    :number
	missions  :Mission[]
	createdAt :Date
	updatedAt :Date
}

export async function addFavorite(userId: string, placeId: string, token: string): Promise<boolean> {
  const req = await fetch(`${baseUrl}/users/add-favorite?userId=${userId}&placeId=${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return req.ok
}

export async function deleteFavorite(userId: string, placeId: string, token: string): Promise<boolean> {
  const req = await fetch(`${baseUrl}/users/delete-favorite?userId=${userId}&placeId=${placeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return req.ok
}

export async function updateUserPointsByUserId(userId: string, points: number, token: string): Promise<boolean> {
  const req = await fetch(`${baseUrl}/users/update-points?userId=${userId}&points=${points}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return req.ok
}

export async function createUser(user: User): Promise<boolean> {
  const data = {
    email: user.email,
    username: user.username,
    password: user.password
  }

  const req = await fetch(`${baseUrl}/users/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return req.ok
}