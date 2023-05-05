<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { Bell, HeartHandshake, MapPin, Star } from 'lucide-svelte';
	import Icon from './Icon.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ripple from 'ripple-effects';
	import { query_selector_all } from 'svelte/internal';

	$: tabs = $page.route.id?.length === 1 ? '/' : $page.route.id?.replace('/', '');
	// console.log(Ripple);

	let handlerClick = (e: MouseEvent) => {
		goto((e.target as HTMLInputElement).value);
	};
</script>

<TabGroup
	justify="justify-between"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="w-full bg-surface-100-800-token md:px-10"
>
	<Tab bind:group={tabs} on:click={handlerClick} name="explorar" value="/" class=" select-none">
		<svelte:fragment slot="lead">
			<div class="mx-auto w-fit"><Icon icon={MapPin} /></div>
		</svelte:fragment>
		<span class="text-sm">Explorar</span>
	</Tab>
	<Tab
		bind:group={tabs}
		on:click={handlerClick}
		name="favoritos"
		value="favoritos"
		class="select-none"
	>
		<svelte:fragment slot="lead">
			<div class="mx-auto w-fit"><Icon icon={Star} /></div>
		</svelte:fragment>
		<span class="text-sm">Favoritos</span>
	</Tab>
	<Tab bind:group={tabs} on:click={handlerClick} name="ajudar" value="ajudar" class=" select-none">
		<svelte:fragment slot="lead">
			<div class="mx-auto w-fit"><Icon icon={HeartHandshake} /></div>
		</svelte:fragment>
		<span class="text-sm">Ajudar</span>
	</Tab>
	<Tab
		bind:group={tabs}
		on:click={handlerClick}
		name="notificações"
		value="notificacoes"
		class=" select-none"
	>
		<svelte:fragment slot="lead">
			<div class="mx-auto w-fit"><Icon icon={Bell} /></div>
		</svelte:fragment>
		<span class="text-sm">Notificações</span>
	</Tab>
</TabGroup>
