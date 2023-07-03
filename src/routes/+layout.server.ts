// toggle for web implementation
// export const prerender = true;
// export const ssr = false;

import { MAPS_API_KEY } from "$env/static/private";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => {
  return {
    mapApiKey: MAPS_API_KEY
  }
}
