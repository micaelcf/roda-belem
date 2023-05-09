<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { Bell, HeartHandshake, MapPin, Star } from 'lucide-svelte';
	import Icon from './Icon.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ripple from 'ripple-effects';
	import { query_selector_all } from 'svelte/internal';
	import Ripple from './Ripple.svelte';

	$: tabs = $page.route.id?.length === 1 ? '/' : $page.route.id?.replace('/', '');
	// console.log(Ripple);

	let handlerClick = (e: MouseEvent) => {
		goto((e.target as HTMLInputElement).value);
	};
</script>

<TabGroup
	justify=""
	hover="hover:variant-soft-secondary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="w-full bg-surface-100-800-token md:px-10 transition-colors duration-[600ms] ease-in-out"
>
	<div class="w-full">
		<Ripple>
			<Tab bind:group={tabs} on:click={handlerClick} name="explorar" value="/" class="select-none">
				<svelte:fragment slot="lead">
					<div class="mx-auto w-fit"><Icon icon={MapPin} /></div>
				</svelte:fragment>
				<span class="text-sm">Explorar</span>
			</Tab>
		</Ripple>
	</div>
	<div class="w-full">
		<Ripple>
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
		</Ripple>
	</div>
	<div class="w-full">
		<Ripple>
			<Tab
				bind:group={tabs}
				on:click={handlerClick}
				name="ajudar"
				value="ajudar"
				class=" select-none"
			>
				<svelte:fragment slot="lead">
					<div class="mx-auto w-fit"><Icon icon={HeartHandshake} /></div>
				</svelte:fragment>
				<span class="text-sm">Ajudar</span>
			</Tab>
		</Ripple>
	</div>
	<div class="w-full">
		<Ripple>
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
		</Ripple>
	</div>
</TabGroup>
