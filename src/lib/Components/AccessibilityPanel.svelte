<script lang="ts">
	import { Checkbox, Radio } from 'flowbite-svelte';
	import { PersonStanding } from 'lucide-svelte';

	export let accessibility: string[];

	const accessibilityFeatures = [
		['Ramp', 'Rampa'],
		['Elevator', 'Elevador'],
		['AdaptedBathroom', 'Banheiro Adaptado'],
		['BrailleSignage', 'Sinalização em Braille'],
		// ['WideCirculationAreas', 'Áreas de Grande Circulação'],
		['ReservedParking', 'Estacionamento reservado'],
		['TactilePaving', 'Piso tátil'],
		// ['AdaptedTelephones', 'Telefones Adaptados'],
		// ['VideoIntercom', 'Vídeo Intercomunicador'],
		['AdaptedTablesCounters', 'Local adaptado'],
		['WheelchairAvailability', 'Cadeira de rodas disponível'],
		['SignLanguageCommunication', 'Libras'],
		['GuideDogAllowed', 'Cão-guia permitido'],
		['OnlineAccessibility', 'Acessibilidade on-line'],
		['AssistiveTechnologyAccess', 'Acesso à Tecnologia Assistiva']
	];
</script>

<div class="no-scrollbar overflow-x-scroll w-[100vw] h-fit py-2 grid grid-flow-col gap-2">
	{#each accessibilityFeatures as af}
		<Checkbox
			on:click={() => {
				let index = accessibility.findIndex((x) => x === af[0]);
				if (index !== -1) {
					accessibility[index] = '';
				}
			}}
			bind:group={accessibility}
			value={af[0]}
			name="custom"
			custom
		>
			<div
				class="flex justify-between items-center w-fit text-gray-500 bg-white rounded-full border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<PersonStanding size="36" />
				<div class="w-full text-sm font-semibold">{af[1]}</div>
			</div>
		</Checkbox>
	{/each}
</div>
