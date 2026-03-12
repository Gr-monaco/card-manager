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

let activeCardId = $state<number | null>(null);

const defaultColumnsData = [
	{
		id: 1,
		title: 'column.backlog',
		cards: [
			{ id: 1, title: 'Study Svelte Documentation', tag: 'research' },
			{ id: 2, title: 'Configure Tauri Environment', tag: 'setup' }
		]
	},
	{
		id: 2,
		title: 'column.inProgress',
		cards: [
			{ id: 3, title: 'Create reusable Components', tag: 'feature' },
			{ id: 4, title: 'Bug in Scrollbar Component', tag: 'bug' }
		]
	},
	{
		id: 3,
		title: 'column.inRevision',
		cards: [{ id: 5, title: 'Integration with API', tag: 'feature' }]
	},
	{
		id: 4,
		title: 'column.concluded',
		cards: [{ id: 6, title: 'Theme Colors Definition', tag: 'design' }]
	}
];

async function getData(): Promise<ColumnStoreState> {
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

	return { columns: defaultColumnsData, lastCardId: 6, isLoading: false };
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

function addCard(columnId: number, cardTitle: string): void {
	const targetColumn = findColumn(columnId);

	const newCardData: CardData = {
		id: ++data.lastCardId,
		title: cardTitle,
		tag: 'feature'
	};

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

	if (activeCardId === cardId) activeCardId = null;

	saveToStorage(data);
}

function findColumn(columnId: number): ColumnInfo {
	const targetColumn = data.columns.find((c) => c.id === columnId);

	if (!targetColumn) {
		throw new Error("Invalid column: The provided ID doesn't match any columns ids.");
	}

	return targetColumn;
}

function setActiveCard(cardId: number | null): void {
	activeCardId = cardId;
}

export const columnStore = {
	get data() {
		return data;
	},
	get activeCardId() {
		return activeCardId;
	},

	initializeStore,
	addCard,
	handleDropCard,
	save: () => saveToStorage(data),
	handleDeleteCard,
	setActiveCard
};
