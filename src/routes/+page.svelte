<script lang="ts">
	import { onMount } from 'svelte';
	import { capacitorMap, mapLoaded } from '$lib/stores';
	import SearchInput from '$lib/Components/SearchInput.svelte';

	// export let data: PageData;

	let mapContainer: Element;
	let map: google.maps.Map;
	let coords: google.maps.LatLngLiteral;

	// web implementation

	const initMap = async (coords: { lat: number; lng: number }) => {
		mapContainer.append($capacitorMap);
		map = new google.maps.Map(mapContainer.children[0] as HTMLElement, {
			mapId: 'f18785d7c0995af6',
			center: coords,
			zoom: 15,
			mapTypeControl: false,
			fullscreenControl: false,
			streetViewControl: false
		});
		mapLoaded.set(true);
		console.log('map loaded');
	};

	const positionHandler = async (position: GeolocationPosition) => {
		coords = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		initMap(coords);
		addMarker();
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
		new google.maps.marker.AdvancedMarkerView({
			map,
			position: map.getCenter(),
			title: 'Você está aqui!',
			content: marker
		});
	};

	onMount(async () => {
		if (!$mapLoaded) {
			navigator.geolocation.getCurrentPosition(positionHandler);
		} else {
			mapContainer.append($capacitorMap);
			addMarker();
		}
	});

	let searchValue: string;
	// $: console.log(searchValue);
</script>

<div bind:this={mapContainer} class="w-full h-full bg-yellow-200" />
<div class="fixed top-10 w-full flex items-center justify-center">
	<SearchInput bind:value={searchValue} />
</div>
