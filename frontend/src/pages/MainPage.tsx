import React from 'react';
import SearchBar from '../components/SearchBar';
import JobCardsPage from './JobCardsPage';

const MainPage:React.FC = () => {
  return (
    <main className='main-page-wrapper container-lg'>
      <SearchBar />
      <JobCardsPage />
    </main>
  )
}

export default MainPage