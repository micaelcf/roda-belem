import { MAPS_API_KEY } from '$env/static/private'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
    return {
        mapsApiKey: MAPS_API_KEY
    }
} 
