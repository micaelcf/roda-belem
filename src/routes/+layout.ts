// toggle for web implementation
export const prerender = true;
export const ssr = false;

import { PUBLIC_MAPS_API_KEY } from "$env/static/public";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = () => {
  return {
    mapApiKey: PUBLIC_MAPS_API_KEY
  }
}