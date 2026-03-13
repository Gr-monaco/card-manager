<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import { columnStore } from '$lib/stores/columnStore.svelte';
	import { init, register, waitLocale } from 'svelte-i18n';

	let { children } = $props();

	columnStore.initializeStore();

	register('en-US', () => import('../locales/en.json'));
	register('pt-BR', () => import('../locales/ptbr.json'));

	function getInitialLocale() {
		if (browser) {
			const savedLang = localStorage.getItem('preferredLang');

			if (savedLang) {
				return savedLang;
			}
		}

		return 'en-US';
	}

	init({
		fallbackLocale: 'en-US',
		initialLocale: getInitialLocale()
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#await waitLocale()}
	<div class="loading">
		<span class="loading-spinner"></span>
	</div>
{:then}
	<Header />
	{@render children()}
{/await}

<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid var(--border-color);
		border-top-color: var(--primary);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
