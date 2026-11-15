export const PETS = [
  { id: 'momo', name: 'Momo', kind: 'Waldgeist', type: 'Natur', description: 'Klein, neugierig und immer auf Abenteuer aus.', color: '#a4e0aa', aura: '#d4f4cc' },
  { id: 'fluff', name: 'Fluff', kind: 'Wolkenkatze', type: 'Luft', description: 'Ein verträumter Freund mit ganz viel Flausch.', color: '#aebaff', aura: '#dfe4ff' },
  { id: 'ember', name: 'Ember', kind: 'Feuerfuchs', type: 'Feuer', description: 'Mutig, energiegeladen und ziemlich frech.', color: '#ffb17e', aura: '#ffe2ba' }
] as const;
export type PetId = (typeof PETS)[number]['id'];
export function isPetId(value: unknown): value is PetId { return PETS.some(p => p.id === value); }
