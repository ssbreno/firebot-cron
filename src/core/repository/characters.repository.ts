import Knex from 'knex';
import db from '../../db';
import { CharacterType } from '../enums/character.enum';
import { Character } from '../interfaces/character.interface';

export default class CharacterRepository {
  private trx: Knex<any, unknown[]> | Knex.Transaction<any, unknown[]>;

  constructor(
    transactionOrKnex:
      | Knex<any, unknown[]>
      | Knex.Transaction<any, unknown[]> = db,
  ) {
    this.trx = transactionOrKnex;
  }
  public async findAll(characterNames: string[]): Promise<Character[]> {
    return this.trx('character').select('*').whereIn('name', characterNames);
  }

  public async create(characters: Character[]): Promise<Character[]> {
    const existingCharacters = await this.findAll(
      characters.map((c) => c.name),
    );

    const newCharacters = characters.filter(
      (c) => !existingCharacters.find((ec) => ec.name === c.name),
    );

    await this.trx('character').insert(
      newCharacters.map((c) => ({
        name: c.name,
        vocation: c.vocation,
        level: c.level,
        type: c.level > 300 ? CharacterType.MAIN : CharacterType.MAKER,
      })),
    );
    return this.findAll(characters.map((c) => c.name));
  }

  public async deleteCharactersNotInList(
    characterNames: string[],
  ): Promise<void> {
    await this.trx('character').whereNotIn('name', characterNames).del();
  }

  public async updateLevel(name: string, level: number): Promise<void> {
    await this.trx('character').where('name', name).update({ level });
  }
}
