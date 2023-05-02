import { writable } from "svelte/store";

// const 
export const capacitorMap = writable(new DOMParser().parseFromString('<capacitor-google-map></capacitor-google-map>', 'text/html').documentElement)
export const mapLoaded = writable(false)