<script lang="ts">
	import { List, ListInput, Page } from 'konsta/svelte';
	import { Search } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let mapContainer: Element;
	let map;
	let zoom = 8;

	onMount(async () => {
		let coords = {
			lat: -23.5505,
			lng: -46.6333
		};
		navigator.geolocation.getCurrentPosition((position) => {
			coords = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			initMap(coords);
		});

		const initMap = async (coords: { lat: number; lng: number }) => {
			map = new google.maps.Map(mapContainer as HTMLElement, {
				mapId: 'f18785d7c0995af6',
				center: coords,
				zoom: 15,
				mapTypeControl: false,
				fullscreenControl: false,
				streetViewControl: false
			});
		};
	});
	let leftPanelOpened = false;
</script>

<svelte:head>
	<script>
		function initMap() {}
	</script>
	<script
		async
		src="https://maps.googleapis.com/maps/api/js?key={data.mapsApiKey}&callback=initMap&v=weekly"
		defer
	></script>
</svelte:head>

<Page class="space-y-0">
	<div bind:this={mapContainer} class="w-screen h-screen absolute bg-yellow-300/40" />

	<List>
		<ListInput outlineIos class="w-full" placeholder="Pesquise um local">
			<Search slot="media" />
		</ListInput>
	</List>
</Page>
