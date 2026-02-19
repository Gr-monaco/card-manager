<script lang="ts">
	import Column from '$lib/components/Column.svelte';
	import type { ColumnInfo } from '$lib/types/columnInfo';

	let columns = $state<ColumnInfo[]>([
		{
			id: 'backlog',
			title: 'Backlog',
			cards: [
				{ id: 'c1', text: 'Estudar documentação do Svelte', tag: 'Pesquisa' },
				{ id: 'c2', text: 'Configurar ambiente Tauri', tag: 'Setup' }
			]
		},
		{
			id: 'progress',
			title: 'Em Progresso',
			cards: [
				{ id: 'c3', text: 'Criar componentes reutilizáveis', tag: 'Feature' },
				{ id: 'c4', text: 'Bug no scroll da sidebar', tag: 'Bug' }
			]
		},
		{
			id: 'review',
			title: 'Em Revisão',
			cards: [{ id: 'c5', text: 'Integração com API', tag: 'Feature' }]
		},
		{
			id: 'done',
			title: 'Concluído',
			cards: [{ id: 'c6', text: 'Definição das cores do tema', tag: 'Design' }]
		}
	]);
</script>

<div class="board">
	{#each columns as columnInfo, i (columnInfo.id)}
		<Column bind:columnInfo={columns[i]}></Column>
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
