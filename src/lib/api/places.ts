export const baseUrl = "http://20.124.42.233:8080"

export type Photo = {
    id: string
    Data: Uint8Array
    description: string
}

export type Place = {
  id: string
  googlePlaceId: string
  name: string
  formatted_address: string
  latitude: number
  longitude: number
  icon: string
  types: string[]
  opening_periods: string[]
  photos: Photo[]
}

// http://20.124.42.233:8080/places/nearby?lat=-1.444866&lng=-48.483695&radius=5000&isFromGoogle=false
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

// async function UpdatePlaceById(placeId: string, place: Place){
//   fetch(`${baseUrl}/places/update`, {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(
//       {
//          id: placeId,
//          name: place.name,
//          formatted_address: place.formatted_address,
//          latitude: place.latitude,


//       }
//       )
// })
// }

export async function findPlaceById(placeId: string): Promise<Place> {
  const req = await fetch(`${baseUrl}/places/find?id=${placeId}`)
  const res: Place = await req.json()
  return res 
}