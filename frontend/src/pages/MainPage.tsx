import React from 'react';
import SearchBar from '../components/SearchBar';
import JobCardsPage from './JobCardsPage';

interface MainPageProps {
  isDarkTheme:boolean
}


const MainPage:React.FC<MainPageProps> = ({isDarkTheme}) => {
  return (
    <main className='main-page-wrapper container-lg'>
      <SearchBar />
      <JobCardsPage isDarkTheme={isDarkTheme} />
    </main>
  )
}

export default MainPage