<script lang="ts">
	import { MapPin, Plus, User2, Heart, PlusCircle } from 'lucide-svelte';
	import { BottomNav, BottomNavItem, Radio, Tooltip } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: tabs = $page.route.id?.length === 1 ? '/' : $page.route.id?.replace('/', '');
	$: actives = [true, false, false, false];

	let handlerClick = (e: MouseEvent) => {
		['/', 'favoritos', 'perfil', 'add'].forEach((tab, i) => {
			if (tab === (e.target as HTMLInputElement).value) {
				actives[i] = true;
			} else {
				actives[i] = false;
			}
		});
		goto((e.target as HTMLInputElement).value);
	};

	let activeClass = 'border-b-4 border-b-black !bg-primary-100 text-primary-500';
</script>

<BottomNav position="fixed" navType="application" classInner="grid-cols-4">
	<BottomNavItem
		on:click={handlerClick}
		value="/"
		btnName="Explorar"
		active={actives[0]}
		{activeClass}
		appBtnPosition="left"
	>
		<MapPin size="36" pointer-events="none" />
		<Tooltip arrow={false}>Explorar</Tooltip>
	</BottomNavItem>
	<BottomNavItem
		on:click={handlerClick}
		btnName="Favoritos"
		value="favoritos"
		active={actives[1]}
		{activeClass}
		appBtnPosition="middle"
	>
		<Heart size="36" pointer-events="none" />
		<Tooltip arrow={false}>Favoritos</Tooltip>
	</BottomNavItem>
	<BottomNavItem
		on:click={handlerClick}
		btnName="Perfil"
		value="perfil"
		active={actives[2]}
		{activeClass}
		appBtnPosition="middle"
	>
		<User2 size="36" pointer-events="none" />
		<Tooltip arrow={false}>Perfil</Tooltip>
	</BottomNavItem>
	<div class="flex items-center justify-center">
		<BottomNavItem
			on:click={handlerClick}
			btnName="Nova contribuição"
			value="add"
			active={actives[3]}
			activeClass="border-b-4 border-b-black !bg-primary-300"
			appBtnPosition="right"
			btnClass="inline-flex items-center justify-center bg-primary-600 h3over:bg-primary-600 w-full h-full font-medium rounded-full focus:outline-none active:outline-none"
		>
			<Plus size="40" pointer-events="none" />
			<Tooltip arrow={false}>Create new item</Tooltip>
		</BottomNavItem>
	</div>
</BottomNav>
