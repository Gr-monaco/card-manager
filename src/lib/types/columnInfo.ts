import type { CardData } from './cardData';

export interface ColumnInfo {
	id: number;
	title: string;
	cards: CardData[];
}
