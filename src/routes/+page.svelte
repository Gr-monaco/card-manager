<script lang="ts">
	interface CardData {
		id: string;
		text: string;
		tag: string;
	}

	interface ColumnInfo {
		id: string;
		title: string;
		cards: CardData[];
	}

	const columns: ColumnInfo[] = [
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
	];
</script>

{#snippet card(cardInfo: CardData)}
	<div class="card" data-card-id={cardInfo.id}>
		<div class="card-title">
			{cardInfo.text}
		</div>
		<div class="card-meta">
			<span class="tag">{cardInfo.tag}</span>
		</div>
	</div>
{/snippet}

{#snippet column(columnInfo: ColumnInfo)}
	<div class="column">
		<div class="column-header">
			<span class="col-title">{columnInfo.title}</span>
			<span class="col-count">{columnInfo.cards.length}</span>
		</div>
		<div class="cards-container" data-column-id={columnInfo.id}>
			{#each columnInfo.cards as cardInfo}
				{@render card(cardInfo)}
			{/each}
		</div>
	</div>
{/snippet}

<div class="board">
	{#each columns as columnInfo}
		{@render column(columnInfo)}
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

	.column {
		background-color: white;
		border: 1px solid var(--border-color);
		border-radius: var(--radius);
		width: 320px;
		min-width: 280px;
		height: 100%;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		scroll-snap-align: center;
	}

	.column-header {
		padding: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	.col-title {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
	}
	.col-count {
		background: #f1f5f9;
		font-size: 0.7rem;
		padding: 2px 8px;
		border-radius: 999px;
		font-weight: 600;
	}

	.cards-container {
		min-height: 50px;
		flex-grow: 1;
		overflow-y: auto;
		padding-bottom: 1rem; /* Espaço pro botão */
	}

	.card {
		background-color: #fff;
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 0.75rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--border-color);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		position: relative;
		touch-action: none; /* IMPORTANTE PARA MOBILE */
	}

	/* Barrinha de status */
	.card::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--primary);
		border-radius: 8px 8px 0 0;
		opacity: 0;
		transition: opacity 0.2s;
	}
	.card:hover::after {
		opacity: 1;
	}

	.card-title {
		font-size: 0.95rem;
		font-weight: 500;
		line-height: 1.4;
	}
	.card-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1rem;
	}

	.tag {
		background: #eff6ff;
		color: var(--primary);
		padding: 4px 8px;
		border-radius: 4px;
		font-weight: 600;
		font-size: 0.65rem;
		text-transform: uppercase;
	}
    
</style>
