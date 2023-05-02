<script lang="ts">
	import { GoogleMap } from '@capacitor/google-maps';
	import { Geolocation } from '@capacitor/geolocation';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { capacitorMap, mapLoaded } from '$lib/stores';

	export let data: PageData;

	let mapContainer: Element;
	// let map: google.maps.Map;
	// capacitor implementation

	const initGoogleMap = async () => {
		let { latitude, longitude } = (await Geolocation.getCurrentPosition()).coords;

		// const capacitorMap = ;
		mapContainer.append($capacitorMap);
		await GoogleMap.create({
			id: 'my-map', // Unique identifier for this map instance
			element: $capacitorMap, // reference to the capacitor-google-map element
			apiKey: data.mapsApiKey, // Your Google Maps API Key
			config: {
				center: { lat: latitude, lng: longitude },
				zoom: 16, // The initial zoom level to be rendered by the map
				streetViewControl: false, // Disable the default street view control
				mapTypeControl: false, // Disable the default map type control
				fullscreenControl: false // Disable the default fullscreen control
			}
		}).then((map) => {
			mapLoaded.set(true);
		});
	};

	onMount(async () => {
		if (!$mapLoaded) {
			await initGoogleMap();
		}
		mapContainer.append($capacitorMap);
	});

	// web implementation
	// const initMap = async (coords: { lat: number; lng: number }) => {
	// 	map = new google.maps.Map(mapContainer as HTMLElement, {
	// 		mapId: 'f18785d7c0995af6',
	// 		center: coords,
	// 		zoom: 15,
	// 		mapTypeControl: false,
	// 		fullscreenControl: false,
	// 		streetViewControl: false
	// 	});
	// };

	// const positionHandler = async (position: GeolocationPosition) => {
	// 	coords = {
	// 		lat: position.coords.latitude,
	// 		lng: position.coords.longitude
	// 	};
	// 	initMap(coords);

	// 	//@ts-ignore
	// 	const { AdvancedMarkerView } = await google.maps.importLibrary('marker');
	// 	const iconWidth = 'w-10';
	// 	const iconSVG = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin ${iconWidth}" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" style="fill: rgb(38, 138, 204); stroke: none;"></path><circle cx="12" cy="10" r="3" style="stroke: none; fill: rgb(0, 0, 0);"></circle></svg>`;
	// 	const mapIcon = new DOMParser().parseFromString(iconSVG, 'image/svg+xml').documentElement;
	// 	const marker = document.createElement('div');
	// 	marker.className = 'flex flex-col justify-center items-center text-black text-xl';
	// 	marker.innerHTML = 'Você';
	// 	marker.appendChild(mapIcon);
	// 	new google.maps.marker.AdvancedMarkerView({
	// 		map,
	// 		position: map.getCenter(),
	// 		title: 'Você está aqui!',
	// 		content: marker
	// 	});
	// };

	// onMount(async () => {
	// 	// navigator.geolocation.getCurrentPosition(positionHandler);
	// });
</script>

<!-- <svelte:head>
	<script>
		function initMap() {}
	</script>
	<script
		async
		src="https://maps.googleapis.com/maps/api/js?v=beta&key={data.mapsApiKey}&callback=initMap"
	>
	</script>
</svelte:head> -->

<div bind:this={mapContainer} class="w-full h-full bg-yellow-200" />
<!-- <div bind:this={mapContainer} cla /> -->
