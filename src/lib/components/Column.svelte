<script lang="ts">
	import { columnStore } from '$lib/stores/columnStore.svelte';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { _ } from 'svelte-i18n';

	import type { CardData } from '$lib/types/cardData';
	import type { ColumnInfo } from '$lib/types/columnInfo';

	interface Props {
		columnInfo: ColumnInfo;
	}

	let { columnInfo = $bindable() }: Props = $props();

	function handleDrop(e: CustomEvent<DndEvent<CardData>>) {
		columnStore.handleDropCard(columnInfo.id, e.detail.items);
	}
</script>

<div class="column">
	<div class="column-header">
		<span class="col-title">{$_(columnInfo.title)}</span>
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
	<button
		class="btn-add-card"
		onclick={() => columnStore.addCard(columnInfo.id, $_('card.newTaskTitle'))}
		><span>+</span> {$_('column.addTask')}
	</button>
</div>

{#snippet card(cardInfo: CardData)}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions-->
	<!-- O onclick é um enhancement para mobile: revela o btn-delete-card ao tocar no card.
	     Usuários de teclado acessam o botão diretamente via Tab, sem precisar deste handler. -->
	<div
		class="card"
		class:card-active={columnStore.activeCardId === cardInfo.id}
		onclick={(e) => {
			columnStore.setActiveCard(cardInfo.id);
			e.stopPropagation();
		}}
		data-card-id={cardInfo.id}
	>
		<button
			class="btn-delete-card"
			onclick={(e) => {
				columnStore.handleDeleteCard(columnInfo.id, cardInfo.id);
				e.stopPropagation();
			}}
			title={$_('card.deleteTask')}
		>
			<svg
				width="14"
				height="14"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
			</svg>
		</button>
		<textarea
			class="card-input-title"
			bind:value={cardInfo.title}
			onchange={() => columnStore.save()}
		></textarea>
		<select class="card-tag-select" bind:value={cardInfo.tag} onchange={() => columnStore.save()}>
			<option value="feature">{$_('card.feature')}</option>
			<option value="bug">{$_('card.bug')}</option>
			<option value="design">{$_('card.design')}</option>
			<option value="research">{$_('card.research')}</option>
			<option value="setup">{$_('card.setup')}</option>
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

	.card:hover::after,
	.card-active::after {
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

	.btn-add-card {
		width: 100%;
		background: transparent;
		border: 2px dashed var(--border-color);
		padding: 0.75rem;
		border-radius: 8px;
		color: var(--text-muted);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		margin-top: 0.5rem;
	}
	.btn-add-card:hover {
		border-color: var(--primary);
		color: var(--primary);
		background: #f8fafc;
	}

	.btn-delete-card {
		position: absolute;
		top: 4px;
		right: 4px;
		width: 24px;
		height: 24px;
		border-radius: 6px;
		border: none;
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0; /* ESCONDIDO POR PADRÃO */
		transition: all 0.2s ease;
		transform: scale(0.8);
	}

	.card:hover .btn-delete-card {
		opacity: 1;
		transform: scale(1);
	}

	.card-active .btn-delete-card {
		opacity: 1;
		transform: scale(1);
	}

	.btn-delete-card:hover {
		background-color: var(--danger);
		color: white;
	}

	@media (max-width: 768px) {
		.card-tag-select {
			font-size: 0.8rem;
			padding: 6px 10px;
		}
	}
</style>
