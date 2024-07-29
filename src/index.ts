import dotenv from 'dotenv';
dotenv.config();

import cron from 'node-cron';
import CharacterRepository from './core/repository/characters.repository';

import AddCharacterService from './core/services/insert-character.service';
import { logger } from './core/utils/logger';
import db from './db';
import { GetGuildsTibiaData } from './external/get-guilds.tibia-api.external';

logger.info('Initialize Application');

const characterRepository = new CharacterRepository(db);
const getGuildsTibiaData = new GetGuildsTibiaData();
const characterService = new AddCharacterService(
  characterRepository,
  getGuildsTibiaData,
);

characterService.scheduleUpdateCharacters();

cron.schedule('0 0 * * *', async () => {
  logger.info('Starting add characters...');
  await characterService.scheduleUpdateCharacters();
  logger.info('Daily character update executed.');
});
