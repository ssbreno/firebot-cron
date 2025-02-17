import axios from 'axios';
import { ApiResponse } from '../core/interfaces/guilds.interface';

export class GetGuildsTibiaData {
  async getGuilds(): Promise<ApiResponse> {
    const url = `https://api.tibiadata.com//v4/guild/Unebro`;
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.get(url, { headers });

      return response.data;
    } catch (error) {
      console.error('Axios error:', error.response?.data || error.message);
    }
  }
}
