import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';

// Import components
import GamesList from '../../components/games-list/games-list.component';
import { getGameScores } from '../../utils/api/api';
import Spinner from '../../components/spinner/spinner.component';

// Import types
import { GameTypes } from '../../@types/games';

// Import styles
import './results.style.scss';

type Games = {
  todaysGames: GameTypes[];
  yesterdaysGames: GameTypes[];
};

// Get todays date
const todaysDate = moment().format('YYYY-MM-DD');
// Get Yesterday date
const yesterdaysDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

const Results = () => {
  const [todaysGames, setTodaysGames] = useState<GameTypes[]>([]);
  const [yesterdaysGames, setYesterdaysGames] = useState<GameTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const memoizedGetGameScores = useMemo(async () => {
    const storedData = sessionStorage.getItem('gameScores');
    if (storedData) {
      return JSON.parse(storedData);
    }

    try {
      const [todayData, yesterdayData] = await Promise.all([
        getGameScores(todaysDate),
        getGameScores(yesterdaysDate),
      ]);
      const data = {
        todaysGames: todayData || [],
        yesterdaysGames: yesterdayData || [],
      };
      sessionStorage.setItem('gameScores', JSON.stringify(data));
      return data;
    } catch (err) {
      // If error then show message
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      // we'll proceed, but let's report it
      reportError({ message });
      return { todaysGames: [], yesterdaysGames: [] };
    }
  }, [todaysDate, yesterdaysDate]);

  // Get Games
  useEffect(() => {
    memoizedGetGameScores.then(({ todaysGames, yesterdaysGames }: Games) => {
      setTodaysGames(todaysGames);
      setYesterdaysGames(yesterdaysGames);
      setIsLoading(false);
    });
  }, [memoizedGetGameScores]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h5>Latest games</h5>
      <GamesList games={yesterdaysGames} />
      <h5>Upcoming games</h5>
      <GamesList games={todaysGames} />
    </>
  );
};

export default Results;
