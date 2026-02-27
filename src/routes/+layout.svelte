<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import { columnStore } from '$lib/stores/columnStore.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		columnStore.initializeStore();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
{@render children()}
