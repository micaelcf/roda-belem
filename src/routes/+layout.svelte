<script lang="ts">
	import { BottomNav, BottomNavItem, ImagePlaceholder, Skeleton, Tooltip } from 'flowbite-svelte';
	import { MapPin, Heart, Plus, PersonStanding } from 'lucide-svelte';
	import '../app.postcss';
	import TabNav from '$lib/Components/TabNav.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
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

<div><slot /></div>

<TabNav />
