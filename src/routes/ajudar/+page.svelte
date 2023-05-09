<script>
	import Comment from '$lib/Components/Comment.svelte';
	import Icon from '$lib/Components/Icon.svelte';
	import Ripple from '$lib/Components/Ripple.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import {
		Accessibility,
		ChevronsRight,
		Globe2,
		MessageCircle,
		MoreVertical,
		Star
	} from 'lucide-svelte';

	let comments = {
		comments: [
			{
				place: 'Praia de Copacabana',
				content:
					'Lugar incrível para relaxar e se divertir! Ótimas opções de bares e restaurantes.',
				likes: 20,
				stars: 4
			},
			{
				place: 'Torre Eiffel',
				content:
					'A vista do topo é simplesmente deslumbrante! Recomendo subir ao anoitecer para ver a cidade iluminada.',
				likes: 15,
				stars: 5
			},
			{
				place: 'Machu Picchu',
				content:
					'Uma experiência única e inesquecível! As ruínas incas são impressionantes e a paisagem é de tirar o fôlego.',
				likes: 25,
				stars: 5
			},
			{
				place: 'Cataratas do Iguaçu',
				content:
					"Um espetáculo da natureza! É impossível não se impressionar com a força das quedas d'água.",
				likes: 18,
				stars: 4
			},
			{
				place: 'Grand Canyon',
				content:
					'A grandiosidade do lugar é indescritível! Recomendo fazer o passeio de helicóptero para ter uma vista completa.',
				likes: 22,
				stars: 5
			}
		]
	};
</script>

<div class="flex flex-col items-center justify-center gap-y-5 py-5 px-6">
	<!-- Header -->
	<div class="flex flex-row justify-start items-center w-full space-x-5">
		<Avatar src="https://placekitten.com/150/150" rounded="rounded-3xl" width="w-24" />
		<div class="flex flex-col items-start w-full">
			<h1 class="h-fit">Denis Silva</h1>
			<h5>32 contribuições</h5>
			<button type="button"><h5 class="text-sm text-primary-300">Ver perfil</h5></button>
		</div>
	</div>
	<!-- Icons -->
	<div class="flex flex-row gap-3 justify-around w-full">
		{#each [{ icon: Accessibility, text: 'Indicar Acessibilidade' }, { icon: Globe2, text: 'Adicionar um lugar' }, { icon: MessageCircle, text: 'Avaliar' }] as icon}
			<div class="flex flex-col items-center">
				<button type="button" class="btn btn-lg variant-filled-primary">
					<Icon iconClass="w-10" icon={icon.icon} />
				</button>
				<h4 class=" text-xs px-0 text-center pointer-events-none">{icon.text}</h4>
			</div>
		{/each}
	</div>
	<!-- Caixa de avaliação -->
	<div class="flex flex-col gap-2 ring-2 ring-primary-400-500-token rounded-lg px-3 py-2 w-full">
		<div class="flex flex-row justify-between items-center">
			<h2 class="text-center">Shopping Starcount</h2>
			<Ripple className="py-2 px-1 rounded-md">
				<Icon iconClass="w-6" icon={MoreVertical} />
			</Ripple>
		</div>
		<h3 class="-mt-3">Hawkins, Georgia</h3>

		<h3 class="font-bold">Avalie este lugar</h3>

		<div class="flex gap-1 mt-2 w-fit">
			<Star size="55" class=" fill-yellow-500" />
			<Star size="55" class=" fill-yellow-500" />
			<Star size="55" class=" fill-yellow-500" />
			<Star size="55" class=" fill-yellow-5" />
			<Star size="55" class=" fill-yellow-5" />
		</div>
		<Ripple className=" rounded-md self-end">
			<Icon iconClass="w-6" icon={ChevronsRight} />
		</Ripple>
	</div>
	<!-- Suas contribuições -->
	<div class="flex flex-col gap-2 w-full">
		<h1 class="font-bold">Suas contribuições</h1>
		{#each comments.comments as comment}
			<Comment {comment} />
		{/each}
	</div>
</div>
