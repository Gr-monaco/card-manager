export type CardTag = 'feature' | 'bug' | 'design' | 'research' | 'setup';

export interface CardData {
	id: number;
	title: string;
	tag: CardTag;
}
