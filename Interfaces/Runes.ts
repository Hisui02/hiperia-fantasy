export interface StyleRuneInterface {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: [{ runes: [RuneInterface] }];
}
// interface Runes[Rune]
export interface RuneInterface {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}
