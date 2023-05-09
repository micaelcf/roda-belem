import type { Position } from "@capacitor/geolocation";
import { writable, type Writable } from "svelte/store";

// const
// export const capacitorMap: Writable<HTMLElement | null> = writable(null) //writable(new DOMParser().parseFromString('<capacitor-google-map class="inline-block w-full h-full"></capacitor-google-map>', 'text/html').documentElement)
export const elementMapStore: Writable<HTMLElement> = writable(new DOMParser().parseFromString('<div class="w-full h-full"></div>', 'text/html').documentElement)
export const mapStore = writable<google.maps.Map | null>(null)
export const mapLoaded = writable(false)
export const currPosition = writable<Position | null>(null)