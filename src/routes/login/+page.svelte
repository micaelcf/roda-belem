<script lang="ts">
	import { buttonAnim } from '$lib/actions';
	import { Button, CloseButton, FloatingLabelInput, Helper, Input, Label } from 'flowbite-svelte';
	import { KeyRound, Mail } from 'lucide-svelte';
	import { Notyf } from 'notyf';
	import 'notyf/notyf.min.css'; // for React, Vue and Svelte

	// Create an instance of Notyf
	const notyf = new Notyf();

	let email = '';
	let password = '';

	function validEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email) && email.length < 4;
	}

	function validSenha(senha: string): boolean {
		return senha.length > 5;
	}

	function handleLogin(event: SubmitEvent) {
		buttonAnim(event.submitter as Node);

		// Lógica de autenticação aqui
		if (!validEmail(email)) {
			notyf.error('Por favor, digite um email valido');
			return;
		}
		if (!validSenha(password)) {
			notyf.error('A senha deve ter no minimo 6 caracteres');
			return;
		}
	}
</script>

<div
	class="flex flex-col justify-center p-6 absolute w-full h-full z-[99] bg-white dark:bg-gray-700"
>
	<h1 class="text-4xl font-bold mb-6 text-center">Login</h1>
	<form on:submit|preventDefault={handleLogin} class="flex flex-col space-y-4">
		<Label class="text-lg">
			<div class="flex items-center gap-2">
				<Mail size="24" />
				E-mail
			</div>
			<Input type="email" placeholder="Digite seu email" bind:value={email} />
		</Label>
		<Label class="text-lg">
			<div class="flex items-center gap-2">
				<KeyRound size="24" />
				Senha
			</div>
			<Input type="password" placeholder="Digite sua senhas" bind:value={password} />
		</Label>
		<Button class="active:scale-90 transition-transform duration-500" size="lg" type="submit"
			>Entrar</Button
		>
	</form>
</div>
