<script lang="ts">
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import { Star, ThumbsUp } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	let notifications = [
		{ read: true, message: 'Novo comentário em seu post', likes: 3, stars: 4 },
		{ read: false, message: 'Reação positiva em seu comentário', likes: 1, stars: 5 },
		{ read: true, message: 'Novo comentário em seu post', likes: 2, stars: 3 },
		{ read: false, message: 'Reação negativa em seu comentário', likes: 0, stars: 2 },
		{ read: false, message: 'Novo comentário em seu post', likes: 4, stars: 4 }
	];
</script>

<div>
	<h1 class=" border-b-2 p-2">Notificações</h1>
	<!-- <AppBar>Notificações</AppBar> -->

	{#if notifications.length > 0}
		<div class="mt-2 w-full rounded-lg shadow-lg overflow-hidden">
			{#each notifications as notification}
				<div class="px-4 py-2 border-b border-gray-200">
					<div class="flex flex-row items-center gap-2">
						<Avatar width="w-20" src="https://i.pravatar.cc/200" alt="" />
						<p class="font-bold w-[50%]">Alguem reagiu a sua contribuição</p>
						{#if !notification.read}
							<div class="w-6 h-6 rounded-full bg-primary-500 ml-auto" />
						{/if}
						<!-- <div class="flex items-center gap-2">
							<ThumbsUp size="30" />
							{notification.likes}
							<Star size="30" class="fill-yellow-500" />
							{notification.stars}
						</div> -->
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
