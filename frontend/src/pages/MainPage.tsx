import React, {useContext} from 'react';
import SearchBar from '../components/SearchBar';
import JobCardsPage from './JobCardsPage';
import { GlobalContext } from '../context/GlobalState';

const MainPage: React.FC = () => {
  const { isDarkTheme } = useContext(GlobalContext);

  return (
    <main className={`main-page-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
      <SearchBar />
      <JobCardsPage />
      <button className="btn btn-large btn-dark-violet load-more">Load More</button>
    </main>
  )
}

export default MainPage