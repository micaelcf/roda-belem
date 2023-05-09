<script lang="ts">
	import { onMount } from 'svelte';
	import { elementMapStore, mapLoaded, currPosition, mapStore } from '$lib/stores';
	import SearchInput from '$lib/Components/SearchInput.svelte';
	import { Geolocation, type PermissionStatus, type Position } from '@capacitor/geolocation';
	import WheelLoader from '$lib/Components/WheelLoader.svelte';
	import { Minus, Plus } from 'lucide-svelte';
	import ripple from 'ripple-effects';
	import Ripple from '$lib/Components/Ripple.svelte';

	let mapContainer: Element;

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

	// web implementation

	const initMap = async (coords: { lat: number; lng: number }) => {
		mapContainer.append($elementMapStore);
		const map = new google.maps.Map(mapContainer.lastElementChild as HTMLElement, {
			mapId: 'f18785d7c0995af6',
			center: coords,
			zoom: 17,
			disableDefaultUI: true
			// mapTypeControl: false,
			// fullscreenControl: false,
			// streetViewControl: false,
			// zoomControl: false
		});
		mapStore.set(map);
		mapLoaded.set(true);
		console.log('map loaded');
	};

	const addMarker = async () => {
		const iconWidth = 'w-10';
		const iconSVG = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin ${iconWidth}" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" style="fill: rgb(38, 138, 204); stroke: none;"></path><circle cx="12" cy="10" r="3" style="stroke: none; fill: rgb(0, 0, 0);"></circle></svg>`;
		const mapIcon = new DOMParser().parseFromString(iconSVG, 'image/svg+xml').documentElement;
		const marker = document.createElement('div');
		marker.className = 'flex flex-col justify-center items-center text-black text-xl';
		marker.innerHTML = 'Você';
		marker.appendChild(mapIcon);
		//@ts-ignore
		const { AdvancedMarkerView } = await google.maps.importLibrary('marker');
		//@ts-ignore
		new google.maps.marker.AdvancedMarkerView({
			map: $mapStore,
			position: $mapStore?.getCenter(),
			title: 'Você está aqui!',
			content: marker
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
		addMarker();
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
	class="btn-icon btn-icon-lg variant-filled-primary w-fit absolute right-3 bottom-36"
>
	<Plus size="40" />
</button>

<button
	on:click={() => decreaseZoom($mapStore)}
	class="btn-icon btn-icon-lg variant-filled-primary w-fit absolute right-3 bottom-24"
>
	<Minus size="40" />
</button>

<div class="fixed top-10 w-full flex items-center justify-center">
	<SearchInput bind:value={searchValue} />
</div>
