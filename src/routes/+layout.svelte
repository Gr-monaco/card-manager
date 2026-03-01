<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import { columnStore } from '$lib/stores/columnStore.svelte';
	import { onMount } from 'svelte';
	import { getLocaleFromNavigator, init, register, waitLocale } from 'svelte-i18n';

	let { children } = $props();

	onMount(() => {
		columnStore.initializeStore();
	});

	register('en-US', () => import('../locales/en.json'));
	register('pt-BR', () => import('../locales/ptbr.json'));

	function getInitialLocale() {
		if (browser) {
			const savedLang = localStorage.getItem('preferredLang');

			if (savedLang) {
				return savedLang;
			}

			return getLocaleFromNavigator();
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
	<div></div>
{:then}
	<Header />
	{@render children()}
{/await}
