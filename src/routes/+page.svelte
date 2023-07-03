<script lang="ts">
	import { onMount } from 'svelte';
	import { mapLoaded, currPosition, mapStore, radiusStore } from '$lib/stores';
	import SearchInput from '$lib/Components/SearchInput.svelte';
	import { Geolocation, type PermissionStatus, type Position } from '@capacitor/geolocation';
	import WheelLoader from '$lib/Components/Wheel.svelte';
	import { Locate, Map, Minus, Plus } from 'lucide-svelte';
	import { baseUrl, getNearbyPlaces, type Place } from '$lib/api/places';
	import { distGeographicTwoPoints } from '$lib/utils';
	import { buttonAnim } from '$lib/actions';

	// Limite de lugares proximos para adicionar ao mapa
	const placesLimitNearby = 70;

	let mapContainer: Element;
	let places: Place[];
	let markersInMap = 0;

	const defaultPosition: Position = {
		coords: {
			latitude: -22.9,
			longitude: -43.2,
			accuracy: 100000,
			speed: null,
			heading: null,
			altitude: null,
			altitudeAccuracy: null
		},
		timestamp: 0
	};
	type MarkerMap = {
		lat: number;
		lng: number;
		name: string;
		icon: string;
	};
	const getDefaultMarker = (marker: MarkerMap) => {
		// default marker
		const iconWidth = 'w-20';
		const defaultSVG = `<svg viewBox="0 0 164 164" class="${iconWidth}" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"><defs><filter id="prefix__a" color-interpolation-filters="sRGB" x="-500%" y="-500%" width="1000%" height="1000%" bx:preset="drop-shadow 1 0 0 4 0.68 rgba(0,0,0,0.3)"><feGaussianBlur in="SourceAlpha" stdDeviation="4"/><feOffset/><feComponentTransfer result="offsetblur"><feFuncA type="linear" slope="1.36"/></feComponentTransfer><feFlood flood-color="rgba(0,0,0,0.3)"/><feComposite in2="offsetblur" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M82.087 150.305l45.661-78.849H36.426l45.661 78.849z" bx:shape="triangle 36.426 -150.305 91.322 78.849 0.5 0 1@197614d2" fill="#5ebc67" stroke-linecap="round" stroke-linejoin="round" stroke="#000"/><circle cx="82" cy="63.695" stroke="#000" fill="#5ebc67" filter="url(#prefix__a)" r="50"/><circle cx="82" cy="63.695" stroke="#fff" stroke-width="3" r="20"/></svg>`;
		const mapIcon = new DOMParser().parseFromString(defaultSVG, 'image/svg+xml').documentElement;
		const defaultMarker = document.createElement('div');
		defaultMarker.className =
			'flex flex-col justify-center items-center text-black text-center text-xs w-fit';
		const textInner = document.createElement('h4');
		textInner.className =
			'text-black text-lg p-1 m-0 text-center max-w-[80kpx] rounded-xl bg-slate-300 shadow-lg';
		textInner.innerHTML = marker.name;
		defaultMarker.appendChild(textInner);
		defaultMarker.appendChild(mapIcon);
		return defaultMarker;
	};

	// web implementation
	$: {
		// here we add markers to map according to limit of nearby places
		if (places) {
			places.slice(0, placesLimitNearby).forEach((place) => {
				let marker: MarkerMap = {
					lat: place.lat,
					lng: place.lng,
					name: place.name,
					icon: place.icon
				};
				addMarker(marker);
			});
		}
	}

	const initMap = async (coords: { lat: number; lng: number }) => {
		const map = new google.maps.Map(mapContainer as HTMLElement, {
			mapId: 'f18785d7c0995af6',
			center: coords,
			zoom: 17,
			disableDefaultUI: true
		});
		mapStore.set(map);
		mapLoaded.set(true);
	};

	const addMarker = async (marker: MarkerMap) => {
		//@ts-ignore
		const { AdvancedMarkerView } = await google.maps.importLibrary('marker');
		//@ts-ignore
		const { PinElement } = await google.maps.importLibrary('marker');

		const iconWidth = 'w-12';
		if (marker.name.length > 8) {
			marker.name = marker.name.substring(0, 9) + '...';
		}

		// custom marker
		const customtSVG = `<svg viewBox="0 0 164 164" class="${iconWidth}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M82.087 150.305l-25.068-43.288C42.064 98.374 32 82.21 32 63.695c0-27.614 22.386-50 50-50s50 22.386 50 50c0 18.406-9.946 34.49-24.757 43.169z" stroke-linecap="round" stroke-linejoin="round" stroke="#000" stroke-width="3" fill="rgba(94,188,103,.58)" paint-order="fill"/><image width="71" height="71" x="46.5" y="22.195" xlink:href="${marker.icon}"/></svg>`;
		const customMapIcon = new DOMParser().parseFromString(
			customtSVG,
			'image/svg+xml'
		).documentElement;
		const customMarker = document.createElement('div');
		customMarker.className =
			'flex flex-col justify-center items-center text-black text-center text-xs w-fit';
		const textInnerCustom = document.createElement('h4');
		textInnerCustom.className =
			'text-black text-lg p-1 m-0 text-center rounded-xl bg-slate-200 shadow-lg';
		textInnerCustom.innerHTML = marker.name;
		customMarker.appendChild(textInnerCustom);
		customMarker.appendChild(customMapIcon);

		const pos: google.maps.LatLngLiteral = {
			lat: marker.lat,
			lng: marker.lng
		};
		// const glyphImg = document.createElement('img');
		// glyphImg.className = 'w-5 h-5';
		// glyphImg.src = marker.icon;
		// //@ts-ignore
		// const glyphEl = new google.maps.marker.PinElement({
		// 	glyph: glyphImg,
		// 	background: 'rgb(94, 188, 103)',
		// 	scale: 1.3
		// });
		let isDefault = marker.icon == '';

		//@ts-ignore
		new google.maps.marker.AdvancedMarkerView({
			map: $mapStore,
			position: pos,
			title: marker.name,
			content: isDefault ? getDefaultMarker(marker) : customMarker,
			collisionBehavior: isDefault
				? google.maps.CollisionBehavior.REQUIRED
				: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY
		});
		markersInMap++;
	};

	const goCurrentPlace = async () => {
		let { latitude, longitude } = $currPosition?.coords as Position['coords'];
		$mapStore?.panTo({ lat: latitude, lng: longitude });
		$mapStore?.setZoom(17);
	};

	const increaseZoom = () => {
		$mapStore?.setZoom(($mapStore?.getZoom() as number) + 1);
	};
	const decreaseZoom = () => {
		$mapStore?.setZoom(($mapStore?.getZoom() as number) - 1);
	};

	const positionHandler = async (position: Position) => {
		currPosition.set(position);
		initMap({
			lat: position.coords.latitude,
			lng: position.coords.longitude
		});
		let myMarker: MarkerMap = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
			name: 'Você',
			icon: ''
		};
		addMarker(myMarker);
		await refreshNearby({ lat: position.coords.latitude, lng: position.coords.longitude });
	};

	const refreshNearby = async (coords: { lat: number; lng: number }) => {
		places = await getNearbyPlaces(coords.lat, coords.lng, $radiusStore, false);
		if (!places || places.length <= 15) {
			places = await getNearbyPlaces(coords.lat, coords.lng, $radiusStore, true);
		}
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

	const initLocation = async () => {
		if (!$mapLoaded) {
			if (/Android|iPhone/i.test(navigator.userAgent))
				await Geolocation.checkPermissions().then((status) => {
					handlerPermissions(status);
				});
			else {
				navigator.geolocation.getCurrentPosition(positionHandler);
			}
		} else {
			mapContainer.append($mapStore?.getDiv() as Node);
		}
	};

	onMount(async () => {
		await initLocation();
	});

	const handleNearby = async () => {
		let { north, east, south, west } = $mapStore
			?.getBounds()
			?.toJSON() as google.maps.LatLngBoundsLiteral;
		const dist = distGeographicTwoPoints({ lat: north, lng: west }, { lat: south, lng: east });
		radiusStore.set(Math.ceil(dist));
		const center = $mapStore?.getCenter();
		// console.log(center?.toJSON());
		// console.log($radiusStore);
		await refreshNearby({ lat: center?.lat() as number, lng: center?.lng() as number });
	};

	let searchValue: string;
	let accessibilityFilters: string;
</script>

<div bind:this={mapContainer} class="w-full h-screen">
	{#if !$mapLoaded}
		<div class=" absolute top-[calc(50%-2.5rem)] w-full flex flex-col items-center">
			<div class="w-16 h-16"><WheelLoader /></div>
			<h2>Carregando</h2>
		</div>
	{/if}
</div>

<button
	on:click={handleNearby}
	use:buttonAnim
	class="bg-primary-300 p-2 absolute rounded-tr-xl rounded-bl-xl left-3 bottom-24"
>
	Procurar aqui
	<!-- <Map size="40" /> -->
</button>

<button
	on:click={goCurrentPlace}
	use:buttonAnim
	class="bg-primary-300 absolute rounded-tr-xl rounded-bl-xl right-3 bottom-48"
>
	<Locate size="40" />
</button>

<button
	on:click={increaseZoom}
	use:buttonAnim
	class="bg-primary-300 absolute rounded-tr-xl rounded-bl-xl right-3 bottom-36"
>
	<Plus size="40" />
</button>

<button
	on:click={decreaseZoom}
	use:buttonAnim
	class="bg-primary-300 absolute rounded-tr-xl rounded-bl-xl right-3 bottom-24"
>
	<Minus size="40" />
</button>

<div class="fixed top-10 w-full flex items-center justify-center">
	<SearchInput bind:value={searchValue} bind:accessibilityFilter={accessibilityFilters} />
</div>
