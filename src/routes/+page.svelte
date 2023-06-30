<script lang="ts">
	import { onMount } from 'svelte';
	import { elementMapStore, mapLoaded, currPosition, mapStore } from '$lib/stores';
	import SearchInput from '$lib/Components/SearchInput.svelte';
	import { Geolocation, type PermissionStatus, type Position } from '@capacitor/geolocation';
	import WheelLoader from '$lib/Components/Wheel.svelte';
	import { Minus, Plus } from 'lucide-svelte';
	// import { getNearbyPlaces, type Place } from '$lib/api/places';

	let mapContainer: Element;
	// let places: Place[];

	const defaultPosition: Position = {
		coords: {
			latitude: -22.9,
			longitude: -43.2,
			accuracy: 0,
			speed: null,
			heading: null,
			altitude: null,
			altitudeAccuracy: null
		},
		timestamp: 0
	};
	type Marker = {
		lat: number;
		lng: number;
		name: string;
		icon: string;
	};

	// web implementation

	const initMap = async (coords: { lat: number; lng: number }) => {
		mapContainer.append($elementMapStore);
		const map = new google.maps.Map(mapContainer.lastElementChild as HTMLElement, {
			mapId: 'f18785d7c0995af6',
			center: coords,
			zoom: 17,
			disableDefaultUI: true
		});
		mapStore.set(map);
		mapLoaded.set(true);
		console.log('map loaded');
	};

	const addMarker = async (marker: Marker) => {
		const iconWidth = 'w-10';
		const iconSVG = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin ${iconWidth}" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" style="fill: rgb(38, 138, 204); stroke: none;"></path><circle cx="12" cy="10" r="3" style="stroke: none; fill: rgb(0, 0, 0);"></circle></svg>`;
		const mapIcon = new DOMParser().parseFromString(iconSVG, 'image/svg+xml').documentElement;
		const markerEl = document.createElement('div');
		markerEl.className = 'flex flex-col justify-center items-center text-black text-xl';
		markerEl.innerHTML = 'Você';
		markerEl.appendChild(mapIcon);
		//@ts-ignore
		const { AdvancedMarkerView } = await google.maps.importLibrary('marker');
		//@ts-ignore
		new google.maps.marker.AdvancedMarkerView({
			map: $mapStore,
			position: { lat: marker.lat, lng: marker.lng },
			title: marker.name,
			content: markerEl
		});
	};

	const increaseZoom = (map: google.maps.Map | null) => {
		$mapStore?.setZoom(($mapStore?.getZoom() as number) + 1);
	};
	const decreaseZoom = (map: google.maps.Map | null) => {
		$mapStore?.setZoom(($mapStore?.getZoom() as number) - 1);
	};

	const positionHandler = async (position: Position) => {
		currPosition.set(position);
		initMap({
			lat: position.coords.latitude,
			lng: position.coords.longitude
		});
		let myMarker: Marker = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
			name: 'Você está aqui',
			icon: ''
		};
		addMarker(myMarker);
		// getNearbyPlaces(position.coords.latitude, position.coords.longitude, 5000, true).then(
		// 	(places) => {
		// 		places.forEach((place) => {
		// 			addMarker({
		// 				lat: place.latitude,
		// 				lng: place.longitude,
		// 				name: place.name,
		// 				icon: ''
		// 			});
		// 		});
		// 	}
		// );
	};

	const handlerPermissions = async (status: PermissionStatus) => {
		switch (status.location) {
			case 'granted':
				Geolocation.getCurrentPosition().then(positionHandler);
				break;
			case 'prompt' || 'prompt-with-rationale':
				Geolocation.requestPermissions().then((permission) => {
					handlerPermissions(permission);
				});
				break;
			default:
				positionHandler(defaultPosition);
				break;
		}
	};

	onMount(async () => {
		if (!$mapLoaded) {
			if (/Android|iPhone/i.test(navigator.userAgent))
				await Geolocation.checkPermissions().then((status) => {
					handlerPermissions(status);
				});
			else {
				navigator.geolocation.getCurrentPosition(positionHandler);
			}
		} else {
			mapContainer.append($elementMapStore);
		}
	});

	let searchValue: string;
	let accessibilityFilters: string;
</script>

<div bind:this={mapContainer} class="w-full h-full">
	{#if !$mapLoaded}
		<div class=" absolute top-[calc(50%-2.5rem)] w-full flex flex-col items-center">
			<div class="w-16 h-16"><WheelLoader /></div>
			<h2>Carregando</h2>
		</div>
	{/if}
</div>

<button
	on:click={() => increaseZoom($mapStore)}
	class="bg-primary-300 absolute rounded-tr-xl rounded-bl-xl right-3 bottom-36"
>
	<Plus size="40" />
</button>

<button
	on:click={() => decreaseZoom($mapStore)}
	class="bg-primary-300 absolute rounded-tr-xl rounded-bl-xl right-3 bottom-24"
>
	<Minus size="40" />
</button>

<div class="fixed top-10 w-full flex items-center justify-center">
	<SearchInput bind:value={searchValue} bind:accessibilityFilter={accessibilityFilters} />
</div>
