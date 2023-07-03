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
      'Authorization': `${token}`
    }
  })
  return req.ok
}

export async function getFavorites(userId: string, token: string): Promise<string[]> {
  const req = await fetch(`${baseUrl}/users/favorite?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })
  return await req.json()
}

export async function deleteFavorite(userId: string, placeId: string, token: string): Promise<boolean> {
  const req = await fetch(`${baseUrl}/users/delete-favorite?userId=${userId}&placeId=${placeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })
  return req.ok
}

export async function updateUserPointsByUserId(userId: string, points: number, token: string): Promise<boolean> {
  const req = await fetch(`${baseUrl}/users/update-points?userId=${userId}&points=${points}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
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

export async function login(user: User) {
  const data = {
    email: user.email,
    password: user.password
  }

  const req = await fetch(`${baseUrl}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(req.headers.get('Authorization')){
    return req.headers.get('Authorization')
  }
  return ""
}