<script>
	import { BottomNav, BottomNavItem, ImagePlaceholder, Skeleton, Tooltip } from 'flowbite-svelte';
	import { MapPin, Heart, Plus, PersonStanding } from 'lucide-svelte';
	import '../app.postcss';
	import TabNav from '$lib/Components/TabNav.svelte';
</script>

<svelte:head>
	<script>
		function initMap() {}
	</script>
	<script
		async
		src="https://maps.googleapis.com/maps/api/js?v=beta&key={'as0as0jasja0s'}&callback=initMap"
	>
	</script>
</svelte:head>

<div><slot /></div>

<TabNav />
