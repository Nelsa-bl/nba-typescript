// Import types
import { GameTypes } from '../../@types/games';
import { Data } from '../../@types/details';

// Import constants
import { API_GAMES_URL } from '../constants/constants';
import { API_STATS_URL } from '../constants/constants';

// Get game scores
export async function getGameScores(date?: string): Promise<GameTypes[]> {
  const url = date ? `${API_GAMES_URL}&dates[]=${date}` : API_GAMES_URL;
  const getGameScoresFromAPI = await fetch(url);
  if (!getGameScoresFromAPI.ok) {
    throw new Error(
      `Problem getting products. Status: ${getGameScoresFromAPI.status}`
    );
  }
  const response = await getGameScoresFromAPI.json();
  return response.data || [];
}

// Get game stats
export async function getGameStats(id?: string): Promise<Data[]> {
  const url = id ? `${API_STATS_URL}&game_ids[]=${id}` : API_STATS_URL;
  const getGamestatsFromAPI = await fetch(url);
  if (!getGamestatsFromAPI.ok) {
    throw new Error(
      `Problem getting products. Status: ${getGamestatsFromAPI.status}`
    );
  }
  const response = await getGamestatsFromAPI.json();
  return response.data || [];
}
