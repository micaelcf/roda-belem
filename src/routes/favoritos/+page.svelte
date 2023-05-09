<script>
	const favorites = [
		{
			name: 'Eiffel Tower',
			location: 'Paris, France',
			lat: 48.8584,
			long: 2.2945
		},
		{
			name: 'Golden Gate Bridge',
			location: 'San Francisco, CA',
			lat: 37.8199,
			long: -122.4783
		},
		{
			name: 'Great Wall of China',
			location: 'China',
			lat: 40.4319,
			long: 116.5704
		}
	];
</script>

<div class="">
	<h1 class=" border-b-2 p-2 mb-6">Favoritos</h1>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
		{#each favorites as favorite}
			<div class="rounded-lg overflow-hidden shadow-md">
				<img
					class="w-full h-48 object-cover"
					src={`https://source.unsplash.com/featured/?${favorite.name}`}
					alt={`${favorite.name} image`}
				/>
				<div class="p-4">
					<h2 class="text-xl font-bold mb-2">{favorite.name}</h2>
					<p class="text-gray-600 text-base">{favorite.location}</p>
					<p class="text-gray-600 text-base">{favorite.lat}, {favorite.long}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
