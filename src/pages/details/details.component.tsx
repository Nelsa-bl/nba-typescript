import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Import components
import { getGameStats } from '../../utils/api/api';
import StatsTable from '../../components/stats-table/stats-table.component';
import Spinner from '../../components/spinner/spinner.component';

// Import types
import { Data } from '../../@types/details';

// Import style
import './details.style.scss';
import '../../styles/nba-logo.scss';

type Params = {
  id: string;
};

const Details = () => {
  const [gameDetails, setGameDetails] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { id } = useParams<Params>();

  const getGameDetails = async () => {
    try {
      setIsLoading(true);
      const data = await getGameStats(id);
      setGameDetails(data);
      setIsLoading(false);
      setIsLoaded(true);
    } catch (err) {
      setIsLoading(false);
      // If error then show message
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      // we'll proceed, but let's report it
      reportError({ message });
      setGameDetails([]);
      setIsLoaded(true);
    }
  };

  // Get Details
  useEffect(() => {
    getGameDetails();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoaded) {
    // Render nothing until the API call is completed
    return null;
  }

  if (!gameDetails.length) {
    return <div className='no-game-container'>Game not found</div>;
  }

  // Get Home team details
  const homeTeamDetails = gameDetails.find(
    (detail) => detail.game.home_team_id === detail.team.id
  );
  const homeTeamFullName = homeTeamDetails?.team.full_name;
  const homeTeamShortName = homeTeamDetails?.team.name;
  const homeTeamScore = homeTeamDetails?.game.home_team_score;
  const homeTeamId = gameDetails[0]?.game.home_team_id;

  // Get Visitor team details
  const visitorTeamDetails = gameDetails.find(
    (detail) => detail.game.visitor_team_id === detail.team.id
  );
  const visitorTeamFullName = visitorTeamDetails?.team.full_name;
  const visitorTeamShortName = visitorTeamDetails?.team.name;
  const visitorTeamScore = visitorTeamDetails?.game.visitor_team_score;
  const visitorTeamId = gameDetails[0]?.game.visitor_team_id;

  return (
    <div className='gameDetails'>
      <div className='top-info'>
        <div className='sep-bg'>
          <div className='team-info'>
            <div className='team home'>
              <span
                className={`team-logo team-logo-${homeTeamShortName}`}
              ></span>
              {homeTeamFullName}
            </div>
            <div className='team visitor'>
              {visitorTeamFullName}
              <span
                className={`team-logo team-logo-${visitorTeamShortName}`}
              ></span>
            </div>
          </div>
        </div>
        <div className='seperator'>
          <span className='team-score'>{homeTeamScore}</span>
          <span className='vs-icon'>-</span>
          <span className='team-score'>{visitorTeamScore}</span>
        </div>
      </div>

      <div className='stats-container'>
        <div className={`home-team team-color-${homeTeamShortName}`}>
          <StatsTable teamId={homeTeamId} details={gameDetails} />
        </div>
        <div className={`visitor-team team-color-${visitorTeamShortName}`}>
          <StatsTable teamId={visitorTeamId} details={gameDetails} />
        </div>
      </div>
    </div>
  );
};

export default Details;
