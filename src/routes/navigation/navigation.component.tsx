// Import Routes
import { Outlet, Link } from 'react-router-dom';

// Import logo
import { ReactComponent as Logo } from '../../assets/svg/logo-nba.svg';

// Import style
import './navigation.style.scss';

const Navigation = () => {
  return (
    <>
      <div className='navigation-container'>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
