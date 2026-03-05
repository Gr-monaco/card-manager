<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';

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

	let {
		mobileMode = false,
		onLanguageChange
	}: {
		mobileMode?: boolean;
		onLanguageChange?: () => void;
	} = $props();

	let currentLanguage = $derived(supportedLanguages.find((l) => l.languageIdentifier === $locale));
	let currentFlag = $derived(currentLanguage?.languageFlag || '🇺🇸');

	let isDropDownOpen = $state(false);

	let dropdownElement: HTMLDivElement;

	function toggleDropdown(): void {
		isDropDownOpen = !isDropDownOpen;
	}

	function handleOutsideClick(event: MouseEvent) {
		if (browser && isDropDownOpen && dropdownElement) {
			if (!dropdownElement.contains(event.target as Node)) {
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

		onLanguageChange?.();

		toggleDropdown();
	}
</script>

<div
	class="dropdown"
	class:mobile-mode={mobileMode}
	class:open={isDropDownOpen}
	bind:this={dropdownElement}
>
	<button class="btn-lang" onclick={toggleDropdown}>
		<span>{currentFlag}</span>
		<span>
			{#if mobileMode}
				{currentLanguage?.languageName}
			{:else}
				{currentLanguage?.languageShortHand}
			{/if}
		</span>
		<svg class="arrow-down" width="12" height="12" viewBox="0 0 12 12">
			<path
				d="M2 4l4 4 4-4"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>

	<div class="dropdown-menu">
		{#each supportedLanguages as language (language.languageIdentifier)}
			<button
				class="dropdown-item"
				class:active={currentLanguage?.languageIdentifier === language.languageIdentifier}
				aria-label={`${$_('languageDropDown.select')} ${language.languageName}`}
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
	}

	.dropdown.mobile-mode {
		width: 100%;
	}

	.dropdown.mobile-mode .btn-lang {
		width: 100%;
		padding: 0.8rem 1rem;
		font-size: 1rem;
		justify-content: space-between;
	}

	.dropdown.mobile-mode .dropdown-menu {
		position: relative;
		width: 100%;
		margin-top: 0.5rem;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	}

	.dropdown.mobile-mode .dropdown-item {
		padding: 1rem 1.2rem;
		font-size: 1rem;
	}

	.dropdown.open .arrow-down {
		transform: rotate(180deg); /* Seta aponta para cima - novo */
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

	.arrow-down {
		transition: transform 0.2s;
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
		z-index: var(--z-dropdown);
		display: none;
		visibility: hidden;
	}

	/* Classe ativa para mostrar o menu */
	.dropdown.open .dropdown-menu {
		display: inline-block;
		visibility: visible;
	}

	/* Itens do Menu */
	.dropdown-item {
		background: none;
		border: none;
		font-family: inherit; /* Ensures font matches the rest of the page */
		text-align: inherit;
		cursor: pointer;

		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 1rem;
		text-decoration: none;
		color: var(--text-main);
		font-size: 0.9rem;
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
