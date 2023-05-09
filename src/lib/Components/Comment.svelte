<script lang="ts">
	import { Star, ThumbsUp } from 'lucide-svelte';

	export let comment = {
		place: 'Praia de Copacabana',
		content: 'Lugar incrível para relaxar e se divertir! Ótimas opções de bares e restaurantes.',
		likes: 20,
		stars: 4
	};
</script>

<div class="flex flex-col w-full gap-2 border-t-2">
	<h2>
		{comment.place}
	</h2>
	<p>{comment.content}</p>
	<div class="flex flex-row justify-between">
		<p class="w-fit flex items-center gap-2">
			<ThumbsUp size="25" />
			{comment.likes}
		</p>
		<div class="flex flex-row gap-1 mt-2 w-fit">
			{#each [...Array(5).keys()] as i}
				<Star size="25" class={i < comment.stars ? ' fill-yellow-500' : ''} />
			{/each}
		</div>
	</div>
</div>
