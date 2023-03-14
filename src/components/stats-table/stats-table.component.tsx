// Import styles
import './stats-table.style.scss';

// Import types
import { Data } from '../../@types/details';

type DetailsProps = {
  details: Data[];
  teamId: number;
};

const StatsTable = ({ teamId, details }: DetailsProps) => {
  function removeLeadingZero(num: string): string {
    if (num.startsWith('00')) {
      return '-';
    } else if (num.charAt(0) === '0') {
      return num.slice(1);
    }
    return num;
  }

  return (
    <>
      <div className='list-player-stats'>
        <div className='list list-placeholder'>
          <span className='min'>Min</span>
          <span className='player'>Name</span>
          <span className='ast'>A</span>
          <span className='reb'>R</span>
          <span className='points'>P</span>
        </div>
        {/* Sort by points then minutes */}
        {details
          .filter((s) => teamId === s.player.team_id)
          .sort((a, b) => {
            const ptsA = parseInt(String(a.pts));
            const ptsB = parseInt(String(b.pts));
            if (ptsA !== ptsB) {
              return ptsB - ptsA;
            } else if (a.min.startsWith('00') || b.min.startsWith('00')) {
              return a.min.startsWith('00') ? 1 : -1;
            } else {
              const minA = parseInt(a.min);
              const minB = parseInt(b.min);
              return minB - minA;
            }
          })
          .map((detail) => (
            <div
              key={detail.id}
              className={`list ${
                detail.min.startsWith('00') ? 'no-play-player' : ''
              }`}
            >
              <span className='min'>{removeLeadingZero(detail.min)}</span>
              <span className='player'>
                {detail.player.first_name} {detail.player.last_name}
              </span>
              <span className='ast'>
                {detail.min.startsWith('00') ? null : detail.ast}
              </span>
              <span className='reb'>
                {detail.min.startsWith('00') ? null : detail.reb}
              </span>
              <span className='points'>
                {detail.min.startsWith('00') ? null : detail.pts}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default StatsTable;
