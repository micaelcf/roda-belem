<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Icon from './Icon.svelte';
	import { Bell, HeartHandshake, MapPin, Star } from 'lucide-svelte';

	let tabs: Element[] = [];
</script>

<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="w-full bg-surface-100-800-token"
>
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="w-full bg-surface-100-800-token"
	>
		<Tab bind:group={tabs} name="explorar" value={0}>
			<svelte:fragment slot="lead">
				<div class="mx-auto w-fit"><Icon icon={MapPin} /></div>
			</svelte:fragment>
			Explorar
		</Tab>
		<Tab bind:group={tabs} name="favoritos" value={1}>
			<svelte:fragment slot="lead">
				<div class="mx-auto w-fit"><Icon icon={Star} /></div>
			</svelte:fragment>
			Favoritos
		</Tab>
		<Tab bind:group={tabs} name="ajudar" value={2}>
			<svelte:fragment slot="lead">
				<div class="mx-auto w-fit"><Icon icon={HeartHandshake} /></div>
			</svelte:fragment>
			Ajudar
		</Tab>
		<Tab bind:group={tabs} name="notificacoes" value={3}>
			<svelte:fragment slot="lead">
				<div class="mx-auto w-fit"><Icon icon={Bell} /></div>
			</svelte:fragment>
			Notificações
		</Tab>
	</TabGroup>
</TabGroup>
