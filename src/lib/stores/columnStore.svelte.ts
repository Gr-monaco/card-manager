import type { CardData } from '$lib/types/cardData';
import type { ColumnInfo } from '$lib/types/columnInfo';

const STORAGE_KEY = 'card_manager_data';

interface ColumnStoreState {
	columns: ColumnInfo[];
	lastCardId: number;
	isLoading: boolean;
}

let data = $state<ColumnStoreState>({
	columns: [],
	lastCardId: 0,
	isLoading: true
});

const defaultColumnsData = [
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

async function getData(): Promise<ColumnStoreState> {
	//Fake timeout just to not flash a loading state
	await new Promise((resolve) => setTimeout(resolve, 600));

	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY);

		if (stored) {
			try {
				return JSON.parse(stored) as ColumnStoreState;
			} catch (e) {
				console.error('Error reading localStorage', e);
				return { columns: defaultColumnsData, lastCardId: 6, isLoading: false };
			}
		}
	}

	return { columns: [], lastCardId: 0, isLoading: true };
}

async function initializeStore() {
	data.isLoading = true;

	try {
		data = await getData();
	} finally {
		data.isLoading = false;
	}
}

function saveToStorage(state: ColumnStoreState) {
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}
}

function addCard(columnId: number): void {
	const targetColumn = findColumn(columnId);

	const newCardData: CardData = {} as CardData;

	newCardData.id = ++data.lastCardId;
	newCardData.title = 'title';
	newCardData.tag = 'Feature';

	targetColumn.cards.push(newCardData);

	saveToStorage(data);
}

function handleDropCard(newColumnId: number, cards: CardData[]) {
	const targetColumn = findColumn(newColumnId);

	targetColumn.cards = cards;

	saveToStorage(data);
}

function handleDeleteCard(columnId: number, cardId: number) {
	const targetColumn = findColumn(columnId);

	targetColumn.cards = targetColumn.cards.filter((c) => c.id !== cardId);

	saveToStorage(data);
}

function findColumn(columnId: number): ColumnInfo {
	const targetColumn = data.columns.find((c) => c.id === columnId);

	if (!targetColumn) {
		throw new Error("Invalid column: The provided ID doesn't match any columns ids.");
	}

	return targetColumn;
}

export const columnStore = {
	get data() {
		return data;
	},

	initializeStore,
	addCard,
	handleDropCard,
	save: () => saveToStorage(data),
	handleDeleteCard
};
