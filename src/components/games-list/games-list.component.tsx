// Import Link
import { Link } from 'react-router-dom';

// Import styles
import './games-list.style.scss';
import '../../styles/nba-logo.scss';

import { GameTypes } from '../../@types/games';

type GamesListProps = {
  games: GameTypes[];
};

const GamesList = ({ games }: GamesListProps) => {
  if (!Array.isArray(games)) {
    console.warn('GamesList: "games" prop should be an array.');
    return null;
  }
  return (
    <>
      <div className='games-list-container'>
        {games.map(
          ({
            id,
            home_team,
            visitor_team,
            home_team_score,
            visitor_team_score,
          }) => (
            <div key={id} className='game-list-box'>
              <div className='game-overview'>
                <Link
                  to={`/game/${id}`}
                  onClick={(e) => {
                    if (!home_team_score && !visitor_team_score) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className='team-home'>
                    <div
                      className={`team-logo team-logo-${home_team.name}`}
                    ></div>
                    <span className='team-name'>{home_team.full_name}</span>
                    <div className='team-score'>{`${
                      home_team_score || ''
                    }`}</div>
                  </div>
                  <div className='at'>-</div>
                  <div className='team-visitor'>
                    <div className='team-score'>{`${
                      visitor_team_score || ''
                    }`}</div>

                    <span className='team-name'>{visitor_team.full_name}</span>
                    <div
                      className={`team-logo team-logo-${visitor_team.name}`}
                    ></div>
                  </div>
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default GamesList;
