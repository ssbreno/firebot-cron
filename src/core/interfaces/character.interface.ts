import { CharacterType } from '../enums/character.enum';

export interface Character {
  id?: string;
  name?: string;
  vocation?: string;
  level?: number;
  type?: CharacterType;
}
