<script lang="ts">
	import { dndzone, type DndEvent } from 'svelte-dnd-action';

	import type { CardData } from '$lib/types/cardData';
	import type { ColumnInfo } from '$lib/types/columnInfo';

	interface Props {
		columnInfo: ColumnInfo;
	}

	let { columnInfo = $bindable() }: Props = $props();

	function handleDrop(e: CustomEvent<DndEvent<CardData>>) {
		columnInfo.cards = e.detail.items;
	}
</script>

<div class="column">
	<div class="column-header">
		<span class="col-title">{columnInfo.title}</span>
		<span class="col-count">{columnInfo.cards.length}</span>
	</div>
	<div
		class="cards-container"
		use:dndzone={{ items: columnInfo.cards, flipDurationMs: 300, type: 'columns' }}
		onconsider={handleDrop}
		onfinalize={handleDrop}
		data-column-id={columnInfo.id}
	>
		{#each columnInfo.cards as cardInfo (cardInfo.id)}
			{@render card(cardInfo)}
		{/each}
	</div>
</div>

{#snippet card(cardInfo: CardData)}
	<div class="card" data-card-id={cardInfo.id}>
		<textarea class="card-input-title" bind:value={cardInfo.text}></textarea>
		<select class="card-tag-select" bind:value={cardInfo.tag}>
			<option value="Feature" selected={cardInfo.tag === 'Feature'}>Feature</option>
			<option value="Bug" selected={cardInfo.tag === 'Bug'}>Bug</option>
			<option value="Design" selected={cardInfo.tag === 'Design'}>Design</option>
			<option value="Pesquisa" selected={cardInfo.tag === 'Pesquisa'}>Research</option>
			<option value="Setup" selected={cardInfo.tag === 'Setup'}>Setup</option>
		</select>
	</div>
{/snippet}

<style>
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

	.card-input-title {
		width: 100%;
		border: 1px solid transparent;
		background: transparent;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text-main);
		line-height: 1.4;
		padding: 4px;
		margin: -4px -4px 0 -4px; /* Compensação para não pular o layout */
		border-radius: 4px;
		resize: none; /* Textarea */
		overflow: hidden;
		transition: border-color 0.2s;
	}

	.card-tag-select {
		align-self: flex-start;
		border: none;
		background: #eff6ff;
		color: var(--primary);
		padding: 4px 8px;
		margin: 4px 0;
		border-radius: 4px;
		font-weight: 600;
		font-size: 0.65rem;
		text-transform: uppercase;
		cursor: pointer;
		font-family: inherit;
		transition: transform 0.1s;
	}
</style>
