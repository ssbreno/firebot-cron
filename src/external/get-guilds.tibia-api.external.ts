import axios from 'axios';
import { TIBIA_DATA_API } from '../core/constant/constant';
import { ApiResponse } from '../core/interfaces/guilds.interface';

export class GetGuildsTibiaData {
  async getGuilds(): Promise<ApiResponse> {
    const url = `${TIBIA_DATA_API}/v4/guild/Unebro`;
    console.log(url);
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
