<script lang="ts">
	import { Badge, Button, Radio, Search } from 'flowbite-svelte';
	import { PersonStanding, Search as SI } from 'lucide-svelte';

	export let value: string;
	export let accessibilityFilters: string;

	const accessibilityFeatures = [
		'Ramp',
		'Elevator',
		'AdaptedBathroom',
		'BrailleSignage',
		'WideCirculationAreas',
		'ReservedParking',
		'TactilePaving',
		'AdaptedTelephones',
		'VideoIntercom',
		'AdaptedTablesCounters',
		'WheelchairAvailability',
		'SignLanguageCommunication',
		'GuideDogAllowed',
		'OnlineAccessibility',
		'AssistiveTechnologyAccess'
	];
	/*
	'Rampa',
'Elevador',
'Banheiro Adaptado',
'Sinalização em Braille',
'Áreas de Grande Circulação',
'Estacionamento reservado',
'Pavimentação tátil',
'Telefones Adaptados',
'Vídeo Intercomunicador',
'Contadores de Tabelas Adaptadas',
'Disponibilidade de cadeira de rodas',
'Comunicação em Língua de Sinais',
'Cão-guia permitido',
'Acessibilidade on-line',
'Acesso à Tecnologia Assistiva'
	*/
</script>

<!-- <input type="search" class=" input w-full max-w-md mx-8 md:mx-0" placeholder="Search" bind:value /> -->
<form class="flex flex-col items-center gap-2">
	<div class="flex gap-2">
		<Search size="lg" bind:value placeholder="Procure um lugar..." />
		<Button class="!p-2.5 active:outline-none focus:outline-none">
			<SI size="20" />
		</Button>
	</div>
	<div class=" overflow-x-scroll w-[100vw] h-fit py-2 grid grid-flow-col gap-2">
		{#each accessibilityFeatures as af}
			<Radio name="custom" custom>
				<div
					class="flex justify-between items-center w-fit text-gray-500 bg-white rounded-full border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
				>
					<PersonStanding size="30" />
					<div class="w-full text-sm font-semibold">{af}</div>
					<!-- <Badge href="/">Badge link</Badge> -->
				</div>
			</Radio>
		{/each}
	</div>
</form>
