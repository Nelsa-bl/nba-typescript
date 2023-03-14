// Import style
import { Outlet } from 'react-router-dom';
import './content-interactive-box.style.scss';

const ContentInteractiveBox = () => {
  return (
    <div className='bg-wrapper'>
      <div className='video-background'>
        <iframe
          title='nba video bg'
          src='https://player.vimeo.com/video/119920294?autoplay=1&loop=1&autopause=0&background=1'
          width='1920'
          height='100%'
          frameBorder='0'
          allow='autoplay;'
          allowFullScreen
        ></iframe>
      </div>
      <div className='content'>
        <div className='container'>
          <div className='content-box'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentInteractiveBox;
