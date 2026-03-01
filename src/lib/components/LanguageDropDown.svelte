<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { locale } from 'svelte-i18n';

	$: currentLanguage = supportedLanguages.find(l => l.languageIdentifier === $locale);
	$: currentFlag = currentLanguage?.languageFlag || '🇺🇸';

	interface Language {
		languageIdentifier: string;
		languageName: string;
		languageFlag: string;
		languageShortHand: string;
	}

	let supportedLanguages: Language[] = [
		{
			languageIdentifier: 'pt-BR',
			languageName: 'Português',
			languageFlag: '🇧🇷',
			languageShortHand: 'PT-BR'
		},
		{
			languageIdentifier: 'en-US',
			languageName: 'English',
			languageFlag: '🇺🇸',
			languageShortHand: 'EN-US'
		}
	];

	let isDropDownOpen = false;

	function toggleDropdown(): void {
		isDropDownOpen = !isDropDownOpen;
	}

	function handleOutsideClick(event: MouseEvent) {
		if (browser && isDropDownOpen) {
			const dropdownElement = document.querySelector('.dropdown');

			if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
				isDropDownOpen = false;
			}
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleOutsideClick);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleOutsideClick);
		}
	});

	function setSelectedLanguage(languageId: string): void {
		$locale = languageId;

		if (browser) {
			localStorage.setItem('preferredLang', languageId);
		}

		toggleDropdown();
	}
</script>

<div class="dropdown" class:open={isDropDownOpen}>
	<button class="btn-lang" onclick={toggleDropdown}>
		<span>{currentFlag}</span>
		<span>{currentLanguage?.languageShortHand}</span>
		<i class="arrow-down"></i>
	</button>

	<div class="dropdown-menu">
		{#each supportedLanguages as language}
			<button
				class="dropdown-item"
				class:active={currentLanguage?.languageIdentifier === language.languageIdentifier}
				onclick={() => setSelectedLanguage(language.languageIdentifier)}
			>
				<span>{language.languageFlag}</span>
				{language.languageName}
			</button>
		{/each}
	</div>
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.btn-lang {
		background: transparent;
		border: 1px solid var(--border-color);
		color: var(--text-main);
		padding: 0.4rem 0.8rem;
		border-radius: 6px;
		font-weight: 500;
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.btn-lang:hover {
		background: #f8fafc;
		border-color: var(--text-muted);
	}

	/* Seta do Dropdown */
	.arrow-down {
		border: solid var(--text-muted);
		border-width: 0 2px 2px 0;
		display: inline-block;
		padding: 3px;
		transform: rotate(45deg);
		transition: transform 0.2s;
		margin-left: 5px;
	}

	.dropdown-menu {
		position: absolute;
		top: 120%; /* Aparece logo abaixo do botão */
		right: 0;
		background: white;
		border-radius: 8px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		border: 1px solid var(--border-color);
		min-width: 140px;
		padding: 0.5rem 0;
		z-index: 100;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-10px);
		transition: all 0.2s ease;
	}

	/* Classe ativa para mostrar o menu */
	.dropdown.open .dropdown-menu {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.dropdown.open .arrow-down {
		transform: rotate(-135deg); /* Seta aponta para cima */
	}

	/* Itens do Menu */
	.dropdown-item {
		background: none;
		border: none;
		font-family: inherit; /* Ensures font matches the rest of the page */
		font-size: inherit;
		text-align: inherit;
		cursor: pointer;

		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 1rem;
		text-decoration: none;
		color: var(--text-main);
		font-size: 0.9rem;
		cursor: pointer;
		transition: background 0.1s;
		width: 100%;
	}

	.dropdown-item:hover {
		background-color: var(--bg-body);
	}

	.dropdown-item.active {
		background-color: #eff6ff;
		color: var(--primary);
		font-weight: 600;
	}
</style>
