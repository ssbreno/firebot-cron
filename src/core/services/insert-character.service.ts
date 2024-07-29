import { GetGuildsTibiaData } from '../../external/get-guilds.tibia-api.external';
import { CharacterType } from '../enums/character.enum';
import CharacterRepository from '../repository/characters.repository';
import { logger } from '../utils/logger';

export default class AddCharacterService {
  constructor(
    private characterRepository: CharacterRepository,
    private getGuildsTibiaData: GetGuildsTibiaData = new GetGuildsTibiaData(),
  ) {}

  public async scheduleUpdateCharacters(): Promise<void> {
    logger.info('Fetching guild data...');
    const apiResponse = await this.getGuildsTibiaData.getGuilds();

    logger.info('Processing members...');
    const members = apiResponse.guild.members;

    const memberNames = members.map((member) => member.name);

    const charactersInDb = await this.characterRepository.findAll(memberNames);
    const characterNamesInDb = charactersInDb.map((char) => char.name);

    const charactersToAddOrUpdate = members.map((member) => ({
      name: member.name,
      vocation: member.vocation,
      level: member.level,
      type: member.level > 300 ? CharacterType.MAIN : CharacterType.MAKER,
    }));

    const charactersToDelete = characterNamesInDb.filter(
      (name) => !memberNames.includes(name),
    );

    logger.info('Adding or updating characters...');
    await this.characterRepository.create(charactersToAddOrUpdate);
    logger.info(`${charactersToAddOrUpdate.length} characters processed`);

    if (charactersToDelete.length > 0) {
      logger.info('Deleting characters not in the latest guild data...');
      await this.characterRepository.deleteCharactersNotInList(
        charactersToDelete,
      );
      logger.info(`${charactersToDelete.length} characters deleted`);
    }

    logger.info('Updating character levels...');
    await Promise.all(
      members.map(async (member) => {
        await this.characterRepository.updateLevel(member.name, member.level);
      }),
    );
    logger.info('Character levels updated.');

    logger.info('Cleanup complete.');
  }
}
