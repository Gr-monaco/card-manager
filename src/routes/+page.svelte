<script lang="ts">
	import Column from '$lib/components/Column.svelte';
	import { columnStore } from '$lib/stores/columnStore.svelte';


</script>

<div class="board">
	{#each columnStore.data.columns as columnInfo, i (columnInfo.id)}
		<Column bind:columnInfo={columnStore.data.columns [i]}></Column>
	{/each}
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
</style>
