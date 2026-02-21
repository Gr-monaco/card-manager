import type { CardData } from '$lib/types/cardData';
import type { ColumnInfo } from '$lib/types/columnInfo';

const STORAGE_KEY = 'card_manager_data';

interface ColumnStoreState {
	columns: ColumnInfo[];
}

const data = $state<ColumnStoreState>(getInitialState());

function getInitialState(): ColumnStoreState {
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY);

		if (stored) {
			try {
				return JSON.parse(stored) as ColumnStoreState;
			} catch (e) {
				console.error('Error reading localStorage', e);
				return { columns: [] };
			}
		}
	}

	const defaultColumnData = [
		{
			id: 1,
			title: 'Backlog',
			cards: [
				{ id: 1, title: 'Estudar documentação do Svelte', tag: 'Pesquisa' },
				{ id: 2, title: 'Configurar ambiente Tauri', tag: 'Setup' }
			]
		},
		{
			id: 2,
			title: 'Em Progresso',
			cards: [
				{ id: 3, title: 'Criar componentes reutilizáveis', tag: 'Feature' },
				{ id: 4, title: 'Bug no scroll da sidebar', tag: 'Bug' }
			]
		},
		{
			id: 3,
			title: 'Em Revisão',
			cards: [{ id: 5, title: 'Integração com API', tag: 'Feature' }]
		},
		{
			id: 4,
			title: 'Concluído',
			cards: [{ id: 6, title: 'Definição das cores do tema', tag: 'Design' }]
		}
	];

	return { columns: defaultColumnData };
}

function saveToStorage(state: ColumnStoreState) {
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}
}

function addCard(columnId: number): void {
	const targetColumn = data.columns.find((c) => c.id === columnId);

	if (!targetColumn) {
		console.error('Invalid column.');
		return;
	}

	const newCardData: CardData = {} as CardData;

	newCardData.id = Math.random();
	newCardData.title = 'title';
	newCardData.tag = 'Feature';

	targetColumn.cards.push(newCardData);

	saveToStorage(data);
}

function handleDropCard(newColumnId: number, cards: CardData[]) {
	const targetColumn = data.columns.find((c) => c.id === newColumnId);

	if (!targetColumn) {
		console.error('Invalid column.');
		return;
	}
	targetColumn.cards = cards;

	saveToStorage(data);
}

export const columnStore = {
	get data() {
		return data;
	},

	addCard,
	handleDropCard,
	save: () => saveToStorage(data),
};
