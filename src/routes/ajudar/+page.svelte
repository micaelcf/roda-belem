<script>
	import { Page, BlockTitle, BlockHeader, Icon, Button, Block, Card } from 'konsta/svelte';
	import { Accessibility, ClipboardSignature, MoreVertical, Plus, Star, User } from 'lucide-svelte';
</script>

<Page class="flex flex-col text-black">
	<div class="text-black justify-center items-center">
		<BlockTitle class="flex">
			<User class="w-fit h-fit" size="45" />
			Fernandos Andromeda
		</BlockTitle>
		<BlockHeader class="text-right">37 contribuições</BlockHeader>
	</div>

	<Block strong outline class="flex space-x-1">
		<Button onClick={() => alert('Indicar Acessibilidade')} tonal large class="">
			Indicar Acessibilidade
		</Button>
		<Button onClick={() => alert('Adicionar um lugar')} tonal large class=""
			>Adicionar um lugar</Button
		>
		<Button onClick={() => alert('Indicar Acessibilidade')} tonal large class="">Avaliar</Button>
	</Block>
	<Card>
		<div slot="header" class="flex justify-between">
			Parque da Cidade
			<Button clear class="w-fit"><MoreVertical /></Button>
		</div>
		<h1 class=" text-lg">Avalie este lugar</h1>
		<div class="flex gap-1 mt-2 mx-auto w-fit">
			<Star size="55" fill="yellow" />
			<Star size="55" fill="yellow" />
			<Star size="55" fill="yellow" />
			<Star size="55" />
			<Star size="55" />
		</div>
	</Card>
</Page>
