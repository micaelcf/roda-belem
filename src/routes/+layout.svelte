<script lang="ts">
	import { BottomNav, BottomNavItem, ImagePlaceholder, Skeleton, Tooltip } from 'flowbite-svelte';
	import { MapPin, Heart, Plus, PersonStanding } from 'lucide-svelte';
	import '../app.postcss';
	import TabNav from '$lib/Components/TabNav.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<svelte:head>
	<script>
		function initMap() {}
	</script>
	<script
		async
		src="https://maps.googleapis.com/maps/api/js?v=beta&key={data.mapApiKey}&callback=initMap"
	>
	</script>
</svelte:head>

<main class="h-full w-full overflow-hidden">
	<slot />
</main>

<TabNav />
