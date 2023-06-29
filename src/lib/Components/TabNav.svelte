<script lang="ts">
	import { MapPin, Plus, User2, Heart } from 'lucide-svelte';
	import { BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: tabs = $page.route.id?.length === 1 ? '/' : $page.route.id?.replace('/', '');

	let handlerClick = (e: MouseEvent) => {
		goto((e.target as HTMLInputElement).value);
		console.log(tabs);
	};

	// let activeClass = `bg-primary-600 text-white`;
</script>

<BottomNav position="absolute" navType="application" classInner="grid-cols-4">
	<BottomNavItem
		on:click={handlerClick}
		bind:group={tabs}
		value="/"
		btnName="Explorar"
		active={tabs == '/'}
		appBtnPosition="left"
	>
		<MapPin size="36" pointer-events="none" />
		<Tooltip arrow={false}>Explorar</Tooltip>
	</BottomNavItem>
	<BottomNavItem
		bind:group={tabs}
		on:click={handlerClick}
		btnName="Favoritos"
		value="favoritos"
		active={tabs == 'favoritos'}
		appBtnPosition="middle"
	>
		<Heart size="36" pointer-events="none" />
		<Tooltip arrow={false}>Favoritos</Tooltip>
	</BottomNavItem>
	<BottomNavItem
		bind:group={tabs}
		on:click={handlerClick}
		btnName="Perfil"
		value="perfil"
		active={tabs == 'perfil'}
		appBtnPosition="middle"
	>
		<User2 size="36" pointer-events="none" />
		<Tooltip arrow={false}>Perfil</Tooltip>
	</BottomNavItem>
	<div class="flex items-center justify-center">
		<BottomNavItem
			bind:group={tabs}
			on:click={handlerClick}
			btnName="Nova contribuição"
			value="add"
			active={tabs == 'add'}
			appBtnPosition="right"
			btnClass="inline-flex items-center justify-center w-full h-full font-medium bg-primary-600 rounded-full focus:outline-none active:outline-none hover:bg-primary-700"
		>
			<Plus size="40" pointer-events="none" />
			<Tooltip arrow={false}>Create new item</Tooltip>
		</BottomNavItem>
	</div>
</BottomNav>
<!-- <div class="w-fit h-fit flex items-center justify-center absolute top-[calc(50%-2.5rem)]">
	<Plus size="64" pointer-events="none" />
</div> -->
