import { writable, type Writable } from "svelte/store";

// const
// export const capacitorMap: Writable<HTMLElement | null> = writable(null) //writable(new DOMParser().parseFromString('<capacitor-google-map class="inline-block w-full h-full"></capacitor-google-map>', 'text/html').documentElement)
export const capacitorMap: Writable<HTMLElement> = writable(new DOMParser().parseFromString('<div class="w-full h-full bg-yellow-200"></div>', 'text/html').documentElement)
export const mapLoaded = writable(false)