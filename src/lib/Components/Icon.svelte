<script lang="ts">
	import { Gift } from 'lucide-svelte';
	export let icon = Gift;
	export let iconClass: string = 'w-7';
</script>

<div class={iconClass}>
	<svelte:component this={icon} size="100%" />
</div>
