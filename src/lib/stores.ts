import type { Position } from '@capacitor/geolocation';
import { writable, type Writable } from 'svelte/store';


export const mapStore = writable<google.maps.Map | null>(null);
export const mapLoaded = writable(false);
export const currPosition = writable<Position | null>(null);
export const radiusStore = writable(1000);
