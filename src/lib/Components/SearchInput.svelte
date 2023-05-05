<script lang="ts">
	export let value: string;
</script>

<input
	type="search"
	class="w-full max-w-md bg-surface-100-800-token mx-8 md:mx-0"
	placeholder="Search"
	bind:value
/>
