// Import Routes
import { Routes, Route } from 'react-router-dom';

// Import components
import Navigation from './routes/navigation/navigation.component';
import Home from './pages/home/home.component';
import Details from './pages/details/details.component';
import NotFoundPage from './components/not-found-page/not-found-page.component';
import ContentInteractiveBox from './components/content-interactive-box/content-interactive-box.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route element={<ContentInteractiveBox />}>
          <Route index element={<Home />} />
          <Route path='game/:id' element={<Details />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
