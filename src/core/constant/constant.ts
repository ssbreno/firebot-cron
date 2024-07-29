import dotenv from 'dotenv';

dotenv.config();

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const TIBIA_DATA_API = process.env.TIBIA_DATA_API;
