<script lang="ts">
	import ripple from 'ripple-effects';
	export let className: string = '';
</script>

<div use:ripple class={className}>
	<slot />
</div>
