<script lang="ts">
	import Column from '$lib/components/Column.svelte';
	import { columnStore } from '$lib/stores/columnStore.svelte';
	import { _ } from 'svelte-i18n';
</script>

<div class="board">
	{#if columnStore.data.isLoading}
		<div class="loading-container">
			<span>{$_('board.loading')}</span>
			<div class="spinner"></div>
		</div>
	{:else}
		{#each columnStore.data.columns as columnInfo, i (columnInfo.id)}
			<Column bind:columnInfo={columnStore.data.columns[i]}></Column>
		{/each}
	{/if}
</div>

<style>
	.board {
		display: flex;
		flex-grow: 1;
		align-items: flex-start;
		gap: 1rem;
		padding: 0 1rem 1rem 1rem;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.board::-webkit-scrollbar {
		display: none;
	}

	.loading-container {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: var(--bg-color, #ffffff); /* Ajuste para a cor do seu fundo */
	}

	.loading-container > span {
		padding: 10px;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3; /* Cor de fundo do spinner */
		border-top: 4px solid #3498db; /* Cor da "barra" que gira */
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
