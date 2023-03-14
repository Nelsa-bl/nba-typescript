// Import style
import './spinner.style.scss';

import { ReactComponent as Logo } from '../../assets/svg/logo-nba.svg';

const Spinner = () => {
  return (
    <div className='spinner-overlay'>
      <div id='spinner' className='spinner-grow' role='status'>
        <Logo height={50} />
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
