<script lang="ts">
	import { Bell, HeartHandshake, MapPin, Star } from 'lucide-svelte';
	import '../app.postcss';
	import { App, Icon, Tabbar, TabbarLink } from 'konsta/svelte';
	import { onMount } from 'svelte';
	// import {activeTab } from '../lib/stores';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	let activeTab = '/';
	function setActiveTab() {
		activeTab = $page.route.id as string;
	}
	afterNavigate(() => {
		setActiveTab();
	});

	onMount(() => {
		// setActiveTab();
	});
</script>

<App theme="material" dark={false}>
	<slot />
	<Tabbar labels={true} icons={true} class="left-0 bottom-0 fixed">
		<TabbarLink href="/" active={activeTab === '/'} label="Explorar">
			<svelte:fragment slot="icon">
				<Icon>
					<MapPin class="w-7 h-7" />
				</Icon>
			</svelte:fragment>
		</TabbarLink>
		<TabbarLink href="/favoritos" active={activeTab === '/favoritos'} label="Favoritos">
			<svelte:fragment slot="icon">
				<Icon>
					<Star class="w-7 h-7" />
				</Icon>
			</svelte:fragment>
		</TabbarLink>
		<TabbarLink href="/ajudar" active={activeTab === '/ajudar'} label="Ajudar">
			<svelte:fragment slot="icon">
				<Icon>
					<HeartHandshake class="w-7 h-7" />
				</Icon>
			</svelte:fragment>
		</TabbarLink>
		<TabbarLink href="notificacoes" active={activeTab === '/notificacoes'} label="Notificações">
			<svelte:fragment slot="icon">
				<Icon>
					<Bell class="w-7 h-7" />
				</Icon>
			</svelte:fragment>
		</TabbarLink>
	</Tabbar>
</App>
