<script lang="ts">
	import { Button, Card, Heading, Img, Rating } from 'flowbite-svelte';
</script>

<div class="flex flex-col items-center space-y-5">
	<div class="border-b-2 border-current w-full h-fit">
		<Heading tag="h2" class="m-4 h-fit w-fit">Favoritos</Heading>
	</div>
	{#each [...Array.from({ length: 20 })] as item}
		<Card size="xs">
			<Img src="https://placekitten.com/200/300" alt="algum lugar" imgClass="h-48 object-cover" />
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Algum lugar
			</h5>
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Endereço Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, alias.
				Recusandae est optio adipisci perspiciatis earum, dolore asperiores nulla omnis repellendus
				error! Nesciunt fugit corporis, et maiores saepe neque dolore.
			</p>
			<div class="flex items-center space-x-2 w-fit">
				<Rating id="example-1b" total={5} size={35} rating={4.66} />
				<span class="text-lg">4.66</span>
			</div>
		</Card>
	{/each}
</div>
