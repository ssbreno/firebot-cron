import axios from 'axios';
import { ApiResponse } from '../core/interfaces/guilds.interface';

export class GetGuildsTibiaData {
  async getGuilds(): Promise<ApiResponse> {
    const url = `${process.env.TIBIA_DATA_API}/v4/guild/Tornabra Encore`;

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
