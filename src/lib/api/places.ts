export const baseUrl = "http://20.55.67.140:8080"

export type Photo = {
    id: string
    Data: Uint8Array
    description: string
}

export type Place = {
  id: string
  googlePlaceId: string
  name: string
  formatedAddress: string
  lat: number
  lng: number
  icon: string
  types: string[]
  openingPeriods: string[]
  photo: Photo[]
  rating: number
}

// http://20.55.67.140:8080/places/nearby?lat=-1.444866&lng=-48.483695&radius=5000&isFromGoogle=false
export async function getNearbyPlaces(lat: number, lng: number, radius: number, isFromGoogle: boolean): Promise<Place[]> {
  const req = await fetch(`${baseUrl}/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}&isFromGoogle=${isFromGoogle}`)
  const res: Place[] = await req.json()
  return res 
}

export async function findPlacesByAccessibilityFeature(accessibilityFeature: string): Promise<Place[]> {
  const req = await fetch(`${baseUrl}/places/accessibility?feature=${accessibilityFeature}`)
  const res: Place[] = await req.json()
  return res 
}

export async function findPlaceById(placeId: string): Promise<Place> {
  const req = await fetch(`${baseUrl}/places/find?id=${placeId}`)
  const res: Place = await req.json()
  return res 
}